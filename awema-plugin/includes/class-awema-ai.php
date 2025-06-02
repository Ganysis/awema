<?php
if (!defined('ABSPATH')) {
    exit;
}

class Awema_AI {
    
    private $api_key;
    private $api_url = 'https://api.deepseek.com/v1/chat/completions';
    
    public function __construct($api_key = '') {
        $this->api_key = $api_key;
    }
    
    public function test_connection() {
        $response = $this->make_api_request("Test de connexion", "Répondez simplement 'OK'");
        return $response !== false;
    }
    
    public function generate_content_for_page($page_type, $client_data) {
        $prompt = $this->build_prompt($page_type, $client_data);
        return $this->make_api_request($page_type, $prompt);
    }
    
    private function build_prompt($page_type, $client_data) {
        $company_name = isset($client_data['company_name']) ? $client_data['company_name'] : 'l\'entreprise';
        $services = isset($client_data['services']) ? implode(', ', $client_data['services']) : 'services de construction';
        $locations = isset($client_data['locations']) ? implode(', ', $client_data['locations']) : 'la région';
        
        $base_context = "Vous écrivez pour {$company_name}, une entreprise du BTP spécialisée dans {$services} et intervenant sur {$locations}.";
        
        switch ($page_type) {
            case 'home':
                return $base_context . " Rédigez le contenu pour la page d'accueil. 
                Incluez :
                - Un titre accrocheur mettant en avant l'expertise
                - Une présentation courte de l'entreprise (2-3 phrases)
                - Les principaux services offerts
                - Un appel à l'action pour contact
                - Mots-clés SEO naturellement intégrés
                Ton professionnel mais accessible. Maximum 300 mots.";
                
            case 'about':
                return $base_context . " Rédigez le contenu pour la page 'À Propos'.
                Incluez :
                - L'histoire et les valeurs de l'entreprise
                - L'expérience et l'expertise
                - L'engagement qualité et satisfaction client
                - La zone d'intervention géographique
                Ton chaleureux et rassurant. Maximum 400 mots.";
                
            case 'services':
                return $base_context . " Rédigez le contenu pour la page 'Nos Services'.
                Incluez :
                - Présentation générale des services
                - Liste détaillée des prestations : {$services}
                - Avantages et garanties
                - Processus de travail
                - Appel à l'action pour devis
                Ton expert et informatif. Maximum 500 mots.";
                
            case 'contact':
                return $base_context . " Rédigez le contenu pour la page 'Contact'.
                Incluez :
                - Invitation à prendre contact
                - Pourquoi faire appel à l'entreprise
                - Promesse de réactivité
                - Zone d'intervention : {$locations}
                - Mention des devis gratuits
                Ton accueillant et incitatif. Maximum 200 mots.";
                
            case 'service_local':
                return $base_context . " Rédigez le contenu pour une page de service local.
                Incluez :
                - Présentation du service dans la localité spécifique
                - Avantages de l'intervention locale
                - Références et réalisations locales
                - Spécificités du service selon la zone
                - Contact pour intervention rapide
                Ton local et personnalisé. Maximum 300 mots.";
                
            default:
                return $base_context . " Rédigez un contenu générique professionnel de 200 mots.";
        }
    }
    
    private function make_api_request($context, $prompt) {
        if (empty($this->api_key)) {
            throw new Exception('Clé API DeepSeek non configurée');
        }
        
        $data = array(
            'model' => 'deepseek-chat',
            'messages' => array(
                array(
                    'role' => 'system',
                    'content' => 'Vous êtes un rédacteur web expert spécialisé dans le secteur du BTP. Vous rédigez du contenu SEO optimisé, professionnel et engageant pour les artisans et entreprises de construction.'
                ),
                array(
                    'role' => 'user',
                    'content' => $prompt
                )
            ),
            'max_tokens' => 1000,
            'temperature' => 0.7
        );
        
        $response = wp_remote_post($this->api_url, array(
            'headers' => array(
                'Content-Type' => 'application/json',
                'Authorization' => 'Bearer ' . $this->api_key
            ),
            'body' => json_encode($data),
            'timeout' => 30
        ));
        
        if (is_wp_error($response)) {
            throw new Exception('Erreur de connexion API: ' . $response->get_error_message());
        }
        
        $body = wp_remote_retrieve_body($response);
        $decoded = json_decode($body, true);
        
        if (isset($decoded['choices'][0]['message']['content'])) {
            return $decoded['choices'][0]['message']['content'];
        }
        
        if (isset($decoded['error'])) {
            throw new Exception('Erreur API: ' . $decoded['error']['message']);
        }
        
        throw new Exception('Réponse API invalide');
    }
    
    public function generate_seo_meta($page_type, $client_data, $content) {
        $company_name = isset($client_data['company_name']) ? $client_data['company_name'] : 'Entreprise BTP';
        $location = isset($client_data['locations'][0]) ? $client_data['locations'][0] : '';
        
        $prompt = "Générez un titre SEO (max 60 caractères) et une meta description (max 155 caractères) pour une page {$page_type} de {$company_name}" . 
                  ($location ? " à {$location}" : "") . 
                  ". Contenu de la page : " . substr($content, 0, 200) . "...
                  
                  Format de réponse:
                  TITRE: [titre SEO]
                  META: [meta description]";
        
        $response = $this->make_api_request('SEO Meta', $prompt);
        
        $meta_data = array();
        if (preg_match('/TITRE:\s*(.+)/i', $response, $matches)) {
            $meta_data['title'] = trim($matches[1]);
        }
        if (preg_match('/META:\s*(.+)/i', $response, $matches)) {
            $meta_data['description'] = trim($matches[1]);
        }
        
        return $meta_data;
    }
    
    public function generate_internal_links($content, $available_pages) {
        $prompt = "Analysez ce contenu et suggérez des emplacements pour des liens internes vers les pages disponibles.
        
        Contenu: {$content}
        
        Pages disponibles: " . implode(', ', $available_pages) . "
        
        Répondez au format:
        LIEN: [texte à remplacer] -> [page de destination]
        
        Maximum 3 liens, seulement si pertinents et naturels.";
        
        $response = $this->make_api_request('Internal Links', $prompt);
        
        $links = array();
        if (preg_match_all('/LIEN:\s*(.+?)\s*->\s*(.+)/i', $response, $matches, PREG_SET_ORDER)) {
            foreach ($matches as $match) {
                $links[] = array(
                    'text' => trim($match[1]),
                    'page' => trim($match[2])
                );
            }
        }
        
        return $links;
    }
}