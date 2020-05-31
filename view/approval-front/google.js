

  let name,email;
      function onSignIn(googleUser) {
        // Useful data for your client-side scripts:
        var profile = googleUser.getBasicProfile();
        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());

        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);
        document.getElementById("name").value=profile.getName();
        name=profile.getName();
        document.getElementById("email").value=profile.getEmail();
        email=profile.getEmail();
        var username =profile.getEmail() ;  
            document.getElementById("username").style.display = "block";
            document.getElementById("_name").style.display = "block";
            document.getElementById("email").value = profile.getEmail();
            document.getElementById("name").value=profile.getName();
            console.log(profile.getEmail());
            console.log(profile.getName());
            $.ajax({
              type:'POST',
              url:'/create',
              data: profile,
              
              success:function(response){
                console.log("response123456");
                
               
              }
            });
            return;
          
}
   

module.exports={
  name,email
}





   
    
