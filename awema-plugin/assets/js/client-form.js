jQuery(document).ready(function($) {
    
    // Form validation and submission
    $('#awema-client-form').on('submit', function(e) {
        e.preventDefault();
        
        const form = $(this);
        const submitBtn = form.find('.awema-submit-btn');
        const submitText = submitBtn.find('.submit-text');
        const submitLoading = submitBtn.find('.submit-loading');
        const resultDiv = $('#awema-form-result');
        
        // Basic validation
        if (!validateForm(form)) {
            return false;
        }
        
        // Show loading state
        submitBtn.prop('disabled', true).addClass('loading');
        submitText.hide();
        submitLoading.show();
        resultDiv.hide();
        
        // Prepare form data
        const formData = new FormData(form[0]);
        formData.append('action', 'awema_submit_client_form');
        
        // Submit form via AJAX
        $.ajax({
            url: awema_client_ajax.ajax_url,
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                if (response.success) {
                    showMessage('success', response.data.message);
                    form[0].reset();
                    // Scroll to top of form
                    $('html, body').animate({
                        scrollTop: $('.awema-client-form-container').offset().top - 50
                    }, 500);
                } else {
                    showMessage('error', response.data || 'Une erreur est survenue. Veuillez réessayer.');
                }
            },
            error: function(xhr, status, error) {
                showMessage('error', 'Erreur de connexion. Veuillez vérifier votre connexion internet et réessayer.');
                console.error('AJAX Error:', error);
            },
            complete: function() {
                // Reset button state
                submitBtn.prop('disabled', false).removeClass('loading');
                submitText.show();
                submitLoading.hide();
            }
        });
    });
    
    // Form validation function
    function validateForm(form) {
        let isValid = true;
        const requiredFields = form.find('input[required], select[required], textarea[required]');
        
        // Remove previous error styling
        form.find('.error').removeClass('error');
        
        requiredFields.each(function() {
            const field = $(this);
            const value = field.val().trim();
            
            if (!value) {
                field.addClass('error');
                isValid = false;
            }
        });
        
        // Validate email format
        const emailField = form.find('input[type="email"]');
        if (emailField.length && emailField.val()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.val())) {
                emailField.addClass('error');
                isValid = false;
            }
        }
        
        // Validate phone format (basic)
        const phoneField = form.find('input[type="tel"]');
        if (phoneField.length && phoneField.val()) {
            const phoneRegex = /^[\+]?[\d\s\-\(\)\.]{10,}$/;
            if (!phoneRegex.test(phoneField.val().replace(/\s/g, ''))) {
                phoneField.addClass('error');
                isValid = false;
            }
        }
        
        // Check if at least one objective is selected
        const objectives = form.find('input[name="site_objectives[]"]:checked');
        if (objectives.length === 0) {
            form.find('input[name="site_objectives[]"]').first().closest('.awema-form-field').addClass('error');
            isValid = false;
        }
        
        if (!isValid) {
            showMessage('error', 'Veuillez corriger les champs en erreur (surlignés en rouge).');
            // Scroll to first error
            const firstError = form.find('.error').first();
            if (firstError.length) {
                $('html, body').animate({
                    scrollTop: firstError.offset().top - 100
                }, 500);
            }
        }
        
        return isValid;
    }
    
    // Show success/error messages
    function showMessage(type, message) {
        const resultDiv = $('#awema-form-result');
        resultDiv.removeClass('success error')
                 .addClass(type)
                 .html(message)
                 .slideDown();
        
        // Auto-hide success messages after 10 seconds
        if (type === 'success') {
            setTimeout(function() {
                resultDiv.slideUp();
            }, 10000);
        }
    }
    
    // Real-time validation feedback
    $('input[required], select[required], textarea[required]').on('blur', function() {
        const field = $(this);
        const value = field.val().trim();
        
        if (value) {
            field.removeClass('error');
        }
    });
    
    // Email validation on blur
    $('input[type="email"]').on('blur', function() {
        const field = $(this);
        const value = field.val().trim();
        
        if (value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(value)) {
                field.removeClass('error');
            } else {
                field.addClass('error');
            }
        }
    });
    
    // Phone formatting and validation
    $('input[type="tel"]').on('input', function() {
        let value = $(this).val().replace(/\D/g, '');
        
        // Format phone number (basic French format)
        if (value.length >= 10) {
            if (value.startsWith('33')) {
                value = '+' + value.substring(0, 2) + ' ' + value.substring(2, 3) + ' ' + 
                        value.substring(3, 5) + ' ' + value.substring(5, 7) + ' ' + 
                        value.substring(7, 9) + ' ' + value.substring(9, 11);
            } else if (value.length === 10) {
                value = value.substring(0, 2) + ' ' + value.substring(2, 4) + ' ' + 
                        value.substring(4, 6) + ' ' + value.substring(6, 8) + ' ' + 
                        value.substring(8, 10);
            }
        }
        
        $(this).val(value);
    });
    
    // Character counter for textareas
    $('textarea').each(function() {
        const textarea = $(this);
        const maxLength = textarea.attr('maxlength');
        
        if (maxLength) {
            const counter = $('<div class="char-counter"></div>');
            textarea.after(counter);
            
            function updateCounter() {
                const remaining = maxLength - textarea.val().length;
                counter.text(remaining + ' caractères restants');
                
                if (remaining < 50) {
                    counter.addClass('warning');
                } else {
                    counter.removeClass('warning');
                }
            }
            
            textarea.on('input', updateCounter);
            updateCounter();
        }
    });
    
    // Auto-save to localStorage (optional feature)
    const formId = 'awema-client-form';
    const storageKey = 'awema_form_draft';
    
    // Load saved draft
    function loadDraft() {
        const savedData = localStorage.getItem(storageKey);
        if (savedData) {
            try {
                const formData = JSON.parse(savedData);
                Object.keys(formData).forEach(function(key) {
                    const field = $('[name="' + key + '"]');
                    if (field.length) {
                        if (field.attr('type') === 'checkbox') {
                            if (Array.isArray(formData[key])) {
                                formData[key].forEach(function(value) {
                                    $('[name="' + key + '"][value="' + value + '"]').prop('checked', true);
                                });
                            }
                        } else {
                            field.val(formData[key]);
                        }
                    }
                });
                
                // Show notification about loaded draft
                showMessage('success', 'Brouillon restauré automatiquement.');
            } catch (e) {
                console.error('Error loading form draft:', e);
            }
        }
    }
    
    // Save draft
    function saveDraft() {
        const formData = {};
        const form = $('#' + formId);
        
        form.find('input, select, textarea').each(function() {
            const field = $(this);
            const name = field.attr('name');
            
            if (name) {
                if (field.attr('type') === 'checkbox') {
                    if (!formData[name]) formData[name] = [];
                    if (field.is(':checked')) {
                        formData[name].push(field.val());
                    }
                } else if (field.attr('type') !== 'submit') {
                    formData[name] = field.val();
                }
            }
        });
        
        localStorage.setItem(storageKey, JSON.stringify(formData));
    }
    
    // Auto-save every 30 seconds
    setInterval(saveDraft, 30000);
    
    // Save on form change
    $('#' + formId).on('change input', function() {
        clearTimeout(window.saveTimeout);
        window.saveTimeout = setTimeout(saveDraft, 2000);
    });
    
    // Clear draft on successful submission
    $(document).on('awema_form_success', function() {
        localStorage.removeItem(storageKey);
    });
    
    // Load draft on page load
    loadDraft();
    
    // Add CSS for error styling
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .awema-form-field input.error,
            .awema-form-field select.error,
            .awema-form-field textarea.error {
                border-color: #e74c3c !important;
                box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.1) !important;
            }
            .char-counter {
                font-size: 12px;
                color: #666;
                margin-top: 5px;
            }
            .char-counter.warning {
                color: #e74c3c;
                font-weight: bold;
            }
        `)
        .appendTo('head');
});

// Trigger custom event on form success
function triggerFormSuccess() {
    jQuery(document).trigger('awema_form_success');
}