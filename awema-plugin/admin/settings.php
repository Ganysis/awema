<?php
if (!defined('ABSPATH')) {
    exit;
}

// Sauvegarder les paramètres
if (isset($_POST['save_settings'])) {
    if (wp_verify_nonce($_POST['awema_settings_nonce'], 'awema_save_settings')) {
        
        $settings = array(
            'default_ai_api_key' => sanitize_text_field($_POST['default_ai_api_key']),
            'google_places_api_key' => sanitize_text_field($_POST['google_places_api_key']),
            'auto_generate_content' => isset($_POST['auto_generate_content']) ? '1' : '0',
            'auto_seo_optimization' => isset($_POST['auto_seo_optimization']) ? '1' : '0',
            'auto_internal_linking' => isset($_POST['auto_internal_linking']) ? '1' : '0',
            'debug_mode' => isset($_POST['debug_mode']) ? '1' : '0',
            'backup_before_generation' => isset($_POST['backup_before_generation']) ? '1' : '0',
            'max_ai_requests_per_hour' => intval($_POST['max_ai_requests_per_hour']),
            'default_primary_color' => sanitize_hex_color($_POST['default_primary_color']),
            'default_secondary_color' => sanitize_hex_color($_POST['default_secondary_color']),
            'awema_branding' => isset($_POST['awema_branding']) ? '1' : '0'
        );
        
        update_option('awema_settings', $settings);
        
        echo '<div class="notice notice-success"><p>Paramètres sauvegardés avec succès!</p></div>';
    }
}

// Récupérer les paramètres actuels
$settings = get_option('awema_settings', array());
$default_settings = array(
    'default_ai_api_key' => '',
    'google_places_api_key' => '',
    'auto_generate_content' => '1',
    'auto_seo_optimization' => '1',
    'auto_internal_linking' => '1',
    'debug_mode' => '0',
    'backup_before_generation' => '1',
    'max_ai_requests_per_hour' => 100,
    'default_primary_color' => '#0073aa',
    'default_secondary_color' => '#005a87',
    'awema_branding' => '1'
);
$settings = array_merge($default_settings, $settings);
?>

<div class="wrap">
    <h1><?php _e('Configuration AWEMA', 'awema'); ?></h1>
    
    <form method="post" action="">
        <?php wp_nonce_field('awema_save_settings', 'awema_settings_nonce'); ?>
        
        <!-- Configuration API -->
        <div class="awema-config-section">
            <h3><?php _e('Configuration API', 'awema'); ?></h3>
            
            <table class="form-table">
                <tr>
                    <th scope="row">
                        <label for="default_ai_api_key"><?php _e('Clé API DeepSeek par Défaut', 'awema'); ?></label>
                    </th>
                    <td>
                        <input type="password" id="default_ai_api_key" name="default_ai_api_key" 
                               value="<?php echo esc_attr($settings['default_ai_api_key']); ?>" 
                               class="regular-text">
                        <button type="button" class="button awema-test-api" data-api-type="deepseek">
                            <?php _e('Tester', 'awema'); ?>
                        </button>
                        <p class="description">
                            <?php _e('Clé API utilisée par défaut pour tous les nouveaux projets', 'awema'); ?>
                        </p>
                        <div class="awema-test-result" id="deepseek-test-result"></div>
                    </td>
                </tr>
                
                <tr>
                    <th scope="row">
                        <label for="google_places_api_key"><?php _e('Clé API Google Places', 'awema'); ?></label>
                    </th>
                    <td>
                        <input type="password" id="google_places_api_key" name="google_places_api_key" 
                               value="<?php echo esc_attr($settings['google_places_api_key']); ?>" 
                               class="regular-text">
                        <button type="button" class="button awema-test-api" data-api-type="google">
                            <?php _e('Tester', 'awema'); ?>
                        </button>
                        <p class="description">
                            <?php _e('Pour récupérer les avis Google My Business (optionnel)', 'awema'); ?>
                        </p>
                        <div class="awema-test-result" id="google-test-result"></div>
                    </td>
                </tr>
                
                <tr>
                    <th scope="row">
                        <label for="max_ai_requests_per_hour"><?php _e('Limite Requêtes IA/Heure', 'awema'); ?></label>
                    </th>
                    <td>
                        <input type="number" id="max_ai_requests_per_hour" name="max_ai_requests_per_hour" 
                               value="<?php echo esc_attr($settings['max_ai_requests_per_hour']); ?>" 
                               min="1" max="1000" class="small-text">
                        <p class="description">
                            <?php _e('Nombre maximum de requêtes IA par heure pour éviter les dépassements', 'awema'); ?>
                        </p>
                    </td>
                </tr>
            </table>
        </div>
        
        <!-- Options de Génération -->
        <div class="awema-config-section">
            <h3><?php _e('Options de Génération', 'awema'); ?></h3>
            
            <table class="form-table">
                <tr>
                    <th scope="row"><?php _e('Génération Automatique', 'awema'); ?></th>
                    <td>
                        <fieldset>
                            <label>
                                <input type="checkbox" name="auto_generate_content" value="1" 
                                       <?php checked($settings['auto_generate_content'], '1'); ?>>
                                <?php _e('Générer automatiquement le contenu avec l\'IA', 'awema'); ?>
                            </label>
                            <br>
                            <label>
                                <input type="checkbox" name="auto_seo_optimization" value="1" 
                                       <?php checked($settings['auto_seo_optimization'], '1'); ?>>
                                <?php _e('Optimiser automatiquement le SEO', 'awema'); ?>
                            </label>
                            <br>
                            <label>
                                <input type="checkbox" name="auto_internal_linking" value="1" 
                                       <?php checked($settings['auto_internal_linking'], '1'); ?>>
                                <?php _e('Créer automatiquement les liens internes', 'awema'); ?>
                            </label>
                            <br>
                            <label>
                                <input type="checkbox" name="backup_before_generation" value="1" 
                                       <?php checked($settings['backup_before_generation'], '1'); ?>>
                                <?php _e('Créer une sauvegarde avant génération', 'awema'); ?>
                            </label>
                        </fieldset>
                    </td>
                </tr>
            </table>
        </div>
        
        <!-- Design par Défaut -->
        <div class="awema-config-section">
            <h3><?php _e('Design par Défaut', 'awema'); ?></h3>
            
            <table class="form-table">
                <tr>
                    <th scope="row">
                        <label for="default_primary_color"><?php _e('Couleur Primaire par Défaut', 'awema'); ?></label>
                    </th>
                    <td>
                        <input type="color" id="default_primary_color" name="default_primary_color" 
                               value="<?php echo esc_attr($settings['default_primary_color']); ?>">
                    </td>
                </tr>
                
                <tr>
                    <th scope="row">
                        <label for="default_secondary_color"><?php _e('Couleur Secondaire par Défaut', 'awema'); ?></label>
                    </th>
                    <td>
                        <input type="color" id="default_secondary_color" name="default_secondary_color" 
                               value="<?php echo esc_attr($settings['default_secondary_color']); ?>">
                    </td>
                </tr>
            </table>
        </div>
        
        <!-- Options Avancées -->
        <div class="awema-config-section">
            <h3><?php _e('Options Avancées', 'awema'); ?></h3>
            
            <table class="form-table">
                <tr>
                    <th scope="row"><?php _e('Mode Debug', 'awema'); ?></th>
                    <td>
                        <label>
                            <input type="checkbox" name="debug_mode" value="1" 
                                   <?php checked($settings['debug_mode'], '1'); ?>>
                            <?php _e('Activer le mode debug (logs détaillés)', 'awema'); ?>
                        </label>
                        <p class="description">
                            <?php _e('Enregistre des logs détaillés pour le débogage. À désactiver en production.', 'awema'); ?>
                        </p>
                    </td>
                </tr>
                
                <tr>
                    <th scope="row"><?php _e('Branding AWEMA', 'awema'); ?></th>
                    <td>
                        <label>
                            <input type="checkbox" name="awema_branding" value="1" 
                                   <?php checked($settings['awema_branding'], '1'); ?>>
                            <?php _e('Afficher les crédits AWEMA sur les sites générés', 'awema'); ?>
                        </label>
                        <p class="description">
                            <?php _e('Ajoute un petit crédit "Propulsé par AWEMA" en pied de page', 'awema'); ?>
                        </p>
                    </td>
                </tr>
            </table>
        </div>
        
        <!-- Informations Système -->
        <div class="awema-config-section">
            <h3><?php _e('Informations Système', 'awema'); ?></h3>
            
            <table class="form-table">
                <tr>
                    <th scope="row"><?php _e('Version WordPress', 'awema'); ?></th>
                    <td><?php echo get_bloginfo('version'); ?></td>
                </tr>
                <tr>
                    <th scope="row"><?php _e('Version PHP', 'awema'); ?></th>
                    <td><?php echo PHP_VERSION; ?></td>
                </tr>
                <tr>
                    <th scope="row"><?php _e('Version AWEMA', 'awema'); ?></th>
                    <td><?php echo AWEMA_VERSION; ?></td>
                </tr>
                <tr>
                    <th scope="row"><?php _e('Thème Divi', 'awema'); ?></th>
                    <td>
                        <?php 
                        $divi_handler = new Awema_Divi();
                        if ($divi_handler->is_divi_active()) {
                            echo '<span style="color: green;">✓ Actif</span>';
                        } else {
                            echo '<span style="color: red;">✗ Non détecté</span>';
                        }
                        ?>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><?php _e('Projets Créés', 'awema'); ?></th>
                    <td>
                        <?php 
                        global $wpdb;
                        $table_name = $wpdb->prefix . 'awema_projects';
                        $count = $wpdb->get_var("SELECT COUNT(*) FROM $table_name");
                        echo intval($count);
                        ?>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><?php _e('Pages Générées', 'awema'); ?></th>
                    <td>
                        <?php 
                        $awema_pages = get_posts(array(
                            'post_type' => 'page',
                            'posts_per_page' => -1,
                            'meta_query' => array(
                                array(
                                    'key' => '_awema_generated',
                                    'value' => '1'
                                )
                            )
                        ));
                        echo count($awema_pages);
                        ?>
                    </td>
                </tr>
            </table>
            
            <h4><?php _e('Actions de Maintenance', 'awema'); ?></h4>
            <p>
                <button type="button" class="button" id="awema-clear-cache">
                    <?php _e('Vider le Cache AWEMA', 'awema'); ?>
                </button>
                
                <button type="button" class="button" id="awema-export-settings">
                    <?php _e('Exporter Configuration', 'awema'); ?>
                </button>
                
                <button type="button" class="button" id="awema-reset-settings">
                    <?php _e('Réinitialiser Configuration', 'awema'); ?>
                </button>
            </p>
        </div>
        
        <p class="submit">
            <input type="submit" name="save_settings" class="button-primary" 
                   value="<?php _e('Sauvegarder la Configuration', 'awema'); ?>">
        </p>
    </form>
</div>

<script>
jQuery(document).ready(function($) {
    
    // Test des API
    $('.awema-test-api').on('click', function() {
        var apiType = $(this).data('api-type');
        var $result = $('#' + apiType + '-test-result');
        var apiKey = '';
        
        if (apiType === 'deepseek') {
            apiKey = $('#default_ai_api_key').val();
        } else if (apiType === 'google') {
            apiKey = $('#google_places_api_key').val();
        }
        
        if (!apiKey) {
            $result.removeClass('success').addClass('error').text('Veuillez entrer une clé API').show();
            return;
        }
        
        $result.hide();
        $(this).text('Test en cours...').prop('disabled', true);
        
        $.ajax({
            url: ajaxurl,
            type: 'POST',
            data: {
                action: 'awema_test_api',
                api_type: apiType,
                api_key: apiKey,
                nonce: '<?php echo wp_create_nonce('awema_test_api'); ?>'
            },
            success: function(response) {
                if (response.success) {
                    $result.removeClass('error').addClass('success').text('Test réussi! API fonctionnelle.');
                } else {
                    $result.removeClass('success').addClass('error').text('Test échoué: ' + response.data);
                }
                $result.show();
            },
            error: function() {
                $result.removeClass('success').addClass('error').text('Erreur de connexion').show();
            },
            complete: function() {
                $('.awema-test-api[data-api-type="' + apiType + '"]').text('Tester').prop('disabled', false);
            }
        });
    });
    
    // Actions de maintenance
    $('#awema-clear-cache').on('click', function() {
        if (confirm('Vider le cache AWEMA?')) {
            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'awema_clear_cache',
                    nonce: '<?php echo wp_create_nonce('awema_clear_cache'); ?>'
                },
                success: function(response) {
                    alert(response.success ? 'Cache vidé avec succès!' : 'Erreur: ' + response.data);
                }
            });
        }
    });
    
    $('#awema-export-settings').on('click', function() {
        var exportData = {
            settings: <?php echo json_encode($settings); ?>,
            version: '<?php echo AWEMA_VERSION; ?>',
            export_date: new Date().toISOString()
        };
        
        var blob = new Blob([JSON.stringify(exportData, null, 2)], {type: 'application/json'});
        var url = URL.createObjectURL(blob);
        
        var a = document.createElement('a');
        a.href = url;
        a.download = 'awema-settings-' + new Date().toISOString().split('T')[0] + '.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
    
    $('#awema-reset-settings').on('click', function() {
        if (confirm('ATTENTION: Cette action réinitialisera tous les paramètres AWEMA. Continuer?')) {
            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'awema_reset_settings',
                    nonce: '<?php echo wp_create_nonce('awema_reset_settings'); ?>'
                },
                success: function(response) {
                    if (response.success) {
                        alert('Configuration réinitialisée!');
                        location.reload();
                    } else {
                        alert('Erreur: ' + response.data);
                    }
                }
            });
        }
    });
    
    // Prévisualisation des couleurs par défaut
    $('#default_primary_color, #default_secondary_color').on('change', function() {
        updateDefaultColorPreview();
    });
    
    function updateDefaultColorPreview() {
        var primaryColor = $('#default_primary_color').val();
        var secondaryColor = $('#default_secondary_color').val();
        
        var $preview = $('.awema-default-color-preview');
        if (!$preview.length) {
            $preview = $('<div class="awema-default-color-preview" style="margin-top: 10px; padding: 10px; border: 1px solid #ddd; border-radius: 4px;"></div>');
            $('#default_secondary_color').closest('td').append($preview);
        }
        
        $preview.html(
            '<strong>Aperçu:</strong> ' +
            '<span style="display: inline-block; width: 20px; height: 20px; background: ' + primaryColor + '; border: 1px solid #ccc; border-radius: 3px; margin: 0 5px; vertical-align: middle;"></span>' +
            'Primaire ' +
            '<span style="display: inline-block; width: 20px; height: 20px; background: ' + secondaryColor + '; border: 1px solid #ccc; border-radius: 3px; margin: 0 5px; vertical-align: middle;"></span>' +
            'Secondaire'
        );
    }
    
    // Initialisation
    updateDefaultColorPreview();
});
</script>