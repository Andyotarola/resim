function files(){
   let files_input =  Array.from(document.querySelectorAll("[data-toggle=file]"));

   if(files_input.length > 0){
      files_input.forEach((file_input)=>{

         file_input.addEventListener("change", ()=>{

            let content_file_name = document.querySelector(`${file_input.dataset.target}`);
            content_file_name.textContent =  file_input.dataset.title;
            let fileSize = 0;
            let fileSizeText = "";
            let fileName = "";

            if(file_input.files.length > 0){
               Array.from(file_input.files).forEach((file)=>{
                  fileSize = file.size;
                  
                  if(file.name.length >= 22 ){
                     fileName = `${file.name.slice(0, 10)}...${file.name.slice(-10, file.name.length)}`;
                  }else{
                     fileName = file.name;
                  }
                  if(file.size >= 1000000){
                     fileSize = fileSize / 1000000;
                     fileSize = fileSize.toFixed(1);
                     fileSizeText = ` (${fileSize} MB)`
                  }else{
                     fileSize = fileSize / 1000;
                     fileSize = fileSize.toFixed(1);
                     fileSizeText = ` (${fileSize} KB)`
                  }
                  if(file_input.files.length > 1){
                     content_file_name.textContent = file_input.files.length + " archivos seleccionados";
                  }else{
                     content_file_name.textContent = fileName + fileSizeText;
                  }
   
               })
            }else{
               content_file_name.textContent =  file_input.dataset.title;
            }
            
         })
      })
   }
}

module.exports =  files;