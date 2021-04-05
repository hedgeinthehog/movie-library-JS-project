import 'firebase/auth'
const mainApp = {};
(function(){
const mainContainer = document.getElementById("main_container");

    const logtout =  function(){
        firebase.auth().signOut().then(function(){
            console.log('success');
            window.location.replace('./login.html');
        },function(){})
    }

const init = function(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          console.log("stay");
          mainContainer.style.display = "";
        } else {
          // No user is signed in.
          mainContainer.style.display = "none";
          console.log("redirect");
          window.location.replace("./login.html");
        }
      });
}
    
init();

mainApp.logout = logtout;
})();