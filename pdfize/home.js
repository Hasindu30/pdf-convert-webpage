document.getElementById('convertBtn').addEventListener('click', function() {
    var files = document.getElementById('imageUpload').files;
    
    if (files.length === 0) {
      alert('Please select at least one JPG image.');
      return;
    }
  
    var pdf = new pdf();
    var imgCount = 0;
  
    function addImageToPDF(file) {
      var reader = new FileReader();
      reader.onload = function(e) {
        pdf.addImage(e.target.result, 'JPEG', 0, 0, 210, 297);
        imgCount++;
        if (imgCount < files.length) {
          pdf.addPage();
          addImageToPDF(files[imgCount]);
        } else {
          pdf.save('converted_pdf.pdf');
          document.getElementById('downloadLink').style.display = 'block';
        }
      };
      reader.readAsDataURL(file);
    }
  
    addImageToPDF(files[0]);
  });