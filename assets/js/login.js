






// login javascript functionality file 
// I decided to seperate the functionalities because I want to uttilize the nav sign up and register button


// navbar sign , register button alongside the the login pages register and sign up instead button are attached to an evenlisterner with function ShowSignUp
let navSignIn = document.querySelector('#homesign'), 
    registerinstead = document.querySelector('#registerinstead'),
    homereg = document.querySelector('#homereg'),
    errormessage = document.querySelector('#errormessage'), 
    // forget pass variable 
    forgetpass = document.querySelector('#forgetpass'),
    SignInstead = document.querySelector('#instead');


// login and register input form 
let userform = document.querySelector('#userform'),
    forgetpassword = document.querySelector('#forgetpassword'),
    signinform = document.querySelector('#sign');






document.addEventListener('DOMContentLoaded', function(){

        navSignIn.addEventListener('click', showSignUp);
        SignInstead.addEventListener('click', showSignUp);
        registerinstead.addEventListener('click', showSignUp);
        homereg.addEventListener('click', showSignUp);



        // event listner that handles signup for users
        userform.addEventListener('submit', e=>{

            e.preventDefault();

            // user form inputs using the form name attribute and value to get user inputs
            let email = userform.email.value,
                password = userform.password.value,
                confirmpass = userform.confirmedpass.value;

                // because of time the password input validation should be more complex than this 
                // below I checked if any input in the form (userform) is empty, if so an error message will appear
                // I also checked if the confirmed password is equal to the passowrd input if not so an error message will appear. 
                if(email === ' ' || password === '' || confirmpass ===''){
                    errormessage.innerHTML = 'All fields are required';
                }else if(password !== confirmpass){
                    errormessage.innerHTML = 'Check your password';
                }else{
                    // if all requirement are met we are working with firebase for servless signup and realtime database for our users
                    firebase.auth().createUserWithEmailAndPassword(email,password)
                    .then((success) => {

                        // checking if the user is logged in with the currentUser property
                        let user = firebase.auth().currentUser;
                        // getting firebase unique id to target users information for populating
                        let uid; 

                        if(user != null){
                            uid = user.uid;
                        }
                        // calling firebase datbase feature
                        let firebaseRef = firebase.database().ref();
                        // stored information from user input
                        let NewUserData = {
                            email:email,
                            password:password,
                        }

                        firebaseRef.child(uid).set(NewUserData);
                        swal('Your Account was Successfully Created', 'Proceed to log in now')
                        .then((value) => {
                            setTimeout(function(){
                                signinform.classList.remove('login__hide')
                                userform.classList.add('login__hide')
                                forgetpassword.classList.add('login__hide')
                            },1000)
                        }); 



                    }).catch((error) => {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log(errorMessage)
                        console.log(errorCode);
                        swal({
                            type: 'error',
                            title: 'Error',
                            text: 'Sign Up not successfull',
                        })
                    });
                }


        })


        signinform.addEventListener('submit', e => {
            e.preventDefault();
            const formbtn = document.querySelector('#signin');

            loadButton(formbtn)
            
            // getting the signin form inputs
            let emailaddress = signinform.signemail.value,
                signinpassword = signinform.signpassword.value;

            // input validation conditions if met we will sign in our user to the programme page
            if(emailaddress === ''){
                errormessage.innerHTML = 'Your Email Address is required to log in'
            }else if(signinpassword === ''){
                errormessage.innerHTML = 'Password is required';
            }else{
                firebase.auth().signInWithEmailAndPassword(emailaddress,signinpassword)
                .then((sucess)=> {
                    swal({
                        type:'successful',
                        title:'Dear User, You successfully signed in',
                        buttons:"Proceed to Programmes"
                    }).then((value) => {

                        setTimeout(function(){
                            window.location.replace("https://open-university.herokuapp.com/programmelist");
                        }, 1000)

                    });
                }).catch((error) => {
                    let errorCode = error.code,
                    errorMessage = error.message;
                    console.log(errorCode + errorMessage);
                    swal({
                        type: 'error',
                        title: 'Sign in not successfull',
                        text: "Your login information is not correct, check your login information or contact our support desk",
                    })
                });
            }

        })

        // on click the forget pass button it brings up the forget password form
        forgetpass.addEventListener('click', e =>{
            forgetpassword.classList.remove('login__hide')
            signinform.classList.add('login__hide')
            userform.classList.add('login__hide')
        })


        // submitting the reset password 
        forgetpassword.addEventListener('submit', e => {
            e.preventDefault();
            swal({
                type:'successful',
                title:'oops !',
                text:'this feature is not implemented yet, kindly remember your password or create a new account'
            }).then((value) => {

                setTimeout(function(){
                    window.location.replace("https://open-university.herokuapp.com/login");
                }, 1000)

            });
        })


        
})


function showSignUp(e){

    
    //  prevent default 
     e.preventDefault();

    // if current event is on the sign up btns metioned above it removes the login hide class and adds it to the the register button and viceversa 
     if(e.currentTarget === SignInstead || e.currentTarget === navSignIn ){

        signinform.classList.remove('login__hide')
        userform.classList.add('login__hide')
        forgetpassword.classList.add('login__hide')

     }else{
         if(e.currentTarget === registerinstead || e.currentTarget === homereg){

            signinform.classList.add('login__hide')
        userform.classList.remove('login__hide')
        forgetpassword.classList.add('login__hide')
         }
     }

}



function loadButton(Button){



    Button.innerHTML = `<i class="fa fa-refresh fa-spin"></i> Processing ...`;
}