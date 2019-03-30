jQuery(document).ready(function($){

  var mediaUploader;
  var lastField = null;

  $('body').on('click', '.acf-img-url-upload', function(e) {
    lastField = $(this).closest('.acf-img-url-wrap').attr('id');

    e.preventDefault();
    // If the uploader object has already been created, reopen the dialog
      if (mediaUploader) {
      mediaUploader.open();
      return;
    }
    // Extend the wp.media object
    mediaUploader = wp.media.frames.file_frame = wp.media({
      title: 'Choose Image',
      button: {
      text: 'Choose Image'
    }, multiple: false });

    // When a file is selected, grab the URL and set it as the text field's value
    mediaUploader.on('select', function() {
      var attachment = mediaUploader.state().get('selection').first().toJSON();
      $('#'+lastField).find('input').val(attachment.url);
      $('#'+lastField).find('.preview').html(
        '<img src="' + attachment.url + '" />' + 
        '<a class="acf-img-url-preview-delete acf-icon -cancel dark" data-name="remove" href="#" title="Remove"></a>'
      );
    });
    // Open the uploader dialog
    mediaUploader.open();
  });

  $('body').on('click', '.acf-img-url-preview-delete', function() {
    var wrap = $(this).closest('.acf-img-url-wrap');
    wrap.find('input').val('');
    wrap.find('.preview').fadeOut(400, function() {
      $(this).html('');
    });
  });

});