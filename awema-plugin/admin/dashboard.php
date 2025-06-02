<?php
if (!defined('ABSPATH')) {
    exit;
}

global $wpdb;
$table_name = $wpdb->prefix . 'awema_projects';
$projects = $wpdb->get_results("SELECT * FROM $table_name ORDER BY created_at DESC");
?>

<div class="wrap">
    <h1><?php _e('AWEMA Dashboard', 'awema'); ?></h1>
    
    <div class="awema-dashboard">
        <div class="awema-stats">
            <div class="stat-card">
                <h3><?php echo count($projects); ?></h3>
                <p><?php _e('Projets Total', 'awema'); ?></p>
            </div>
            <div class="stat-card">
                <h3><?php echo count(array_filter($projects, function($p) { return $p->status === 'completed'; })); ?></h3>
                <p><?php _e('Projets Complétés', 'awema'); ?></p>
            </div>
            <div class="stat-card">
                <h3><?php echo count(array_filter($projects, function($p) { return $p->status === 'draft'; })); ?></h3>
                <p><?php _e('Projets en Cours', 'awema'); ?></p>
            </div>
        </div>
        
        <div class="awema-quick-actions">
            <h2><?php _e('Actions Rapides', 'awema'); ?></h2>
            <div class="action-buttons">
                <a href="<?php echo admin_url('admin.php?page=awema-new-project'); ?>" class="button button-primary button-hero">
                    <?php _e('Nouveau Projet', 'awema'); ?>
                </a>
                <a href="<?php echo admin_url('admin.php?page=awema-templates'); ?>" class="button button-secondary button-hero">
                    <?php _e('Gérer Templates', 'awema'); ?>
                </a>
            </div>
        </div>
        
        <div class="awema-recent-projects">
            <h2><?php _e('Projets Récents', 'awema'); ?></h2>
            <?php if (!empty($projects)): ?>
                <table class="wp-list-table widefat fixed striped">
                    <thead>
                        <tr>
                            <th><?php _e('Nom du Projet', 'awema'); ?></th>
                            <th><?php _e('Statut', 'awema'); ?></th>
                            <th><?php _e('Date de Création', 'awema'); ?></th>
                            <th><?php _e('Actions', 'awema'); ?></th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach (array_slice($projects, 0, 10) as $project): ?>
                            <tr>
                                <td><strong><?php echo esc_html($project->project_name); ?></strong></td>
                                <td>
                                    <span class="status-badge status-<?php echo esc_attr($project->status); ?>">
                                        <?php echo ucfirst($project->status); ?>
                                    </span>
                                </td>
                                <td><?php echo date_i18n(get_option('date_format'), strtotime($project->created_at)); ?></td>
                                <td>
                                    <a href="<?php echo admin_url('admin.php?page=awema-new-project&edit=' . $project->id); ?>" class="button button-small">
                                        <?php _e('Éditer', 'awema'); ?>
                                    </a>
                                    <button class="button button-small awema-generate-site" data-project-id="<?php echo $project->id; ?>">
                                        <?php _e('Générer Site', 'awema'); ?>
                                    </button>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            <?php else: ?>
                <p><?php _e('Aucun projet trouvé. Créez votre premier projet!', 'awema'); ?></p>
            <?php endif; ?>
        </div>
    </div>
</div>