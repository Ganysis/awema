jQuery(document).ready(function($) {
    
    // Variables globales
    var awemaAjax = awema_ajax || {};
    
    // Gestion du formulaire de projet
    $('#awema-project-form').on('submit', function(e) {
        e.preventDefault();
        saveProject();
    });
    
    // Génération de site
    $('.awema-generate-site').on('click', function(e) {
        e.preventDefault();
        var projectId = $(this).data('project-id');
        generateSite(projectId);
    });
    
    // Test de connexion API
    $('.awema-test-api').on('click', function(e) {
        e.preventDefault();
        testApiConnection();
    });
    
    // Upload du logo
    if (typeof wp !== 'undefined' && wp.media) {
        $('#logo_upload').on('click', function(e) {
            e.preventDefault();
            
            var mediaUploader = wp.media({
                title: 'Choisir un logo',
                button: {
                    text: 'Utiliser ce logo'
                },
                multiple: false,
                library: {
                    type: 'image'
                }
            });
            
            mediaUploader.on('select', function() {
                var attachment = mediaUploader.state().get('selection').first().toJSON();
                $('#logo_url').val(attachment.url);
                updateLogoPreview(attachment.url);
            });
            
            mediaUploader.open();
        });
    }
    
    // Prévisualisation des couleurs
    $('#primary_color, #secondary_color').on('change', function() {
        updateColorPreview();
    });
    
    // Chargement des templates
    loadTemplates();
    
    // Fonctions
    function saveProject() {
        var formData = new FormData();
        
        // Récupérer toutes les données du formulaire
        $('#awema-project-form').find('input, textarea, select').each(function() {
            var $input = $(this);
            var name = $input.attr('name');
            var value = $input.val();
            
            if (name && value !== undefined) {
                formData.append(name, value);
            }
        });
        
        formData.append('action', 'awema_save_project');
        formData.append('nonce', awemaAjax.nonce);
        
        showLoading('Sauvegarde en cours...');
        
        $.ajax({
            url: awemaAjax.ajax_url,
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                hideLoading();
                
                if (response.success) {
                    showNotice('Projet sauvegardé avec succès!', 'success');
                    
                    // Mettre à jour l'ID du projet si nouveau
                    if (response.data.project_id && !$('input[name="project_id"]').val()) {
                        $('input[name="project_id"]').val(response.data.project_id);
                    }
                } else {
                    showNotice('Erreur lors de la sauvegarde: ' + response.data, 'error');
                }
            },
            error: function(xhr, status, error) {
                hideLoading();
                showNotice('Erreur de connexion: ' + error, 'error');
            }
        });
    }
    
    function generateSite(projectId) {
        if (!projectId) {
            projectId = $('input[name="project_id"]').val();
        }
        
        if (!projectId) {
            showNotice('Veuillez d\'abord sauvegarder le projet', 'warning');
            return;
        }
        
        if (!confirm('Êtes-vous sûr de vouloir générer le site? Cette action peut prendre plusieurs minutes.')) {
            return;
        }
        
        showLoading('Génération du site en cours...');
        showProgress(0);
        
        // Simulation du progrès
        var progress = 0;
        var progressInterval = setInterval(function() {
            progress += Math.random() * 15;
            if (progress > 90) progress = 90;
            showProgress(progress);
        }, 1000);
        
        $.ajax({
            url: awemaAjax.ajax_url,
            type: 'POST',
            data: {
                action: 'awema_generate_site',
                project_id: projectId,
                nonce: awemaAjax.nonce
            },
            timeout: 300000, // 5 minutes
            success: function(response) {
                clearInterval(progressInterval);
                showProgress(100);
                hideLoading();
                
                if (response.success) {
                    showNotice('Site généré avec succès! ' + response.data.pages_created + ' pages créées.', 'success');
                } else {
                    showNotice('Erreur lors de la génération: ' + response.data, 'error');
                }
            },
            error: function(xhr, status, error) {
                clearInterval(progressInterval);
                hideLoading();
                
                if (status === 'timeout') {
                    showNotice('La génération prend plus de temps que prévu. Veuillez vérifier le statut dans le tableau de bord.', 'warning');
                } else {
                    showNotice('Erreur de connexion: ' + error, 'error');
                }
            }
        });
    }
    
    function testApiConnection() {
        var apiKey = $('#ai_api_key').val();
        
        if (!apiKey) {
            showNotice('Veuillez entrer une clé API', 'warning');
            return;
        }
        
        $('.awema-test-result').hide();
        showLoading('Test de connexion...');
        
        $.ajax({
            url: awemaAjax.ajax_url,
            type: 'POST',
            data: {
                action: 'awema_test_ai_connection',
                api_key: apiKey,
                nonce: awemaAjax.nonce
            },
            success: function(response) {
                hideLoading();
                
                if (response.success) {
                    showTestResult('Connexion réussie!', 'success');
                } else {
                    showTestResult('Connexion échouée: ' + response.data, 'error');
                }
            },
            error: function(xhr, status, error) {
                hideLoading();
                showTestResult('Erreur de test: ' + error, 'error');
            }
        });
    }
    
    function loadTemplates() {
        if (!$('#template_selection').length) return;
        
        $.ajax({
            url: awemaAjax.ajax_url,
            type: 'POST',
            data: {
                action: 'awema_get_templates',
                nonce: awemaAjax.nonce
            },
            success: function(response) {
                if (response.success && response.data) {
                    var $select = $('#template_selection');
                    $select.empty().append('<option value="">Sélectionner un template...</option>');
                    
                    $.each(response.data, function(index, template) {
                        $select.append('<option value="' + template.id + '">' + template.name + '</option>');
                    });
                }
            }
        });
    }
    
    function updateLogoPreview(url) {
        var $preview = $('#logo_preview');
        if (url) {
            $preview.html('<img src="' + url + '" style="max-width: 200px; margin-top: 10px;">');
        } else {
            $preview.empty();
        }
    }
    
    function updateColorPreview() {
        var primaryColor = $('#primary_color').val();
        var secondaryColor = $('#secondary_color').val();
        
        // Créer ou mettre à jour la prévisualisation
        var $preview = $('.awema-color-preview');
        if (!$preview.length) {
            $preview = $('<div class="awema-color-preview" style="margin-top: 10px; padding: 15px; border: 1px solid #ddd; border-radius: 4px;"></div>');
            $('#secondary_color').closest('td').append($preview);
        }
        
        $preview.html(
            '<div style="display: flex; gap: 10px; align-items: center;">' +
            '<div style="width: 30px; height: 30px; background: ' + primaryColor + '; border: 1px solid #ccc; border-radius: 4px;"></div>' +
            '<span>Couleur Primaire</span>' +
            '<div style="width: 30px; height: 30px; background: ' + secondaryColor + '; border: 1px solid #ccc; border-radius: 4px; margin-left: 20px;"></div>' +
            '<span>Couleur Secondaire</span>' +
            '</div>'
        );
    }
    
    function showLoading(message) {
        var $loading = $('.awema-loading');
        if (!$loading.length) {
            $loading = $('<div class="awema-loading"><p>' + (message || 'Chargement...') + '</p></div>');
            $('body').append($loading);
        }
        $loading.find('p').text(message || 'Chargement...');
        $loading.show();
    }
    
    function hideLoading() {
        $('.awema-loading').hide();
    }
    
    function showProgress(percent) {
        var $progress = $('.awema-progress');
        if (!$progress.length) {
            $progress = $(
                '<div class="awema-progress">' +
                '<div class="awema-progress-bar"></div>' +
                '</div>'
            );
            $('.awema-loading').append($progress);
        }
        
        $progress.find('.awema-progress-bar').css('width', percent + '%');
        
        if (percent >= 100) {
            setTimeout(function() {
                $progress.remove();
            }, 1000);
        }
    }
    
    function showNotice(message, type) {
        type = type || 'info';
        
        var $notice = $('<div class="awema-notice ' + type + '"><p>' + message + '</p></div>');
        $('.wrap').prepend($notice);
        
        // Auto-remove après 5 secondes
        setTimeout(function() {
            $notice.fadeOut(function() {
                $(this).remove();
            });
        }, 5000);
        
        // Scroll vers le haut pour voir la notice
        $('html, body').animate({ scrollTop: 0 }, 500);
    }
    
    function showTestResult(message, type) {
        var $result = $('.awema-test-result');
        if (!$result.length) {
            $result = $('<div class="awema-test-result"></div>');
            $('.awema-test-api').after($result);
        }
        
        $result.removeClass('success error').addClass(type);
        $result.text(message).show();
    }
    
    // Validation du formulaire
    function validateForm() {
        var isValid = true;
        var errors = [];
        
        // Nom du projet requis
        if (!$('#project_name').val().trim()) {
            errors.push('Le nom du projet est requis');
            isValid = false;
        }
        
        // Données client requises
        if (!$('#client_data').val().trim()) {
            errors.push('Les données client sont requises');
            isValid = false;
        }
        
        // Validation des couleurs
        var primaryColor = $('#primary_color').val();
        var secondaryColor = $('#secondary_color').val();
        
        if (!isValidColor(primaryColor)) {
            errors.push('Couleur primaire invalide');
            isValid = false;
        }
        
        if (!isValidColor(secondaryColor)) {
            errors.push('Couleur secondaire invalide');
            isValid = false;
        }
        
        if (errors.length > 0) {
            showNotice('Erreurs de validation: ' + errors.join(', '), 'error');
        }
        
        return isValid;
    }
    
    function isValidColor(color) {
        return /^#[0-9A-F]{6}$/i.test(color);
    }
    
    // Auto-save (toutes les 30 secondes si des changements)
    var formChanged = false;
    var autoSaveInterval;
    
    $('#awema-project-form').on('change input', function() {
        formChanged = true;
    });
    
    function startAutoSave() {
        autoSaveInterval = setInterval(function() {
            if (formChanged && $('#project_name').val().trim()) {
                console.log('Auto-sauvegarde...');
                saveProject();
                formChanged = false;
            }
        }, 30000); // 30 secondes
    }
    
    // Démarrer l'auto-save si on édite un projet existant
    if ($('input[name="project_id"]').val()) {
        startAutoSave();
    }
    
    // Nettoyage lors du déchargement de la page
    $(window).on('beforeunload', function() {
        if (autoSaveInterval) {
            clearInterval(autoSaveInterval);
        }
    });
    
    // Raccourcis clavier
    $(document).on('keydown', function(e) {
        // Ctrl+S pour sauvegarder
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            if ($('#awema-project-form').length) {
                saveProject();
            }
        }
    });
    
    // Initialisation
    updateColorPreview();
    
    // Easter egg - Konami code
    var konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    var konamiIndex = 0;
    
    $(document).on('keydown', function(e) {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                console.log('🚀 AWEMA Power Mode Activated! 🚀');
                $('body').addClass('awema-power-mode');
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
});