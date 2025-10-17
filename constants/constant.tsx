// export const COLORS = {
//   primary: "#0ba718ff",
//   secondary: "#f07e3cff",
//   background: "#202016ff",
//   text: "#fff",
//   border: "#353528ff",
// };

export const LightTheme = {
  background: "#FFFFFF",
  text: "#000000",
  header: "#f07e3cff",
};

export const DarkTheme = {
  //background: "#000000",
   background: "#1b1a1ac5",
  text: "#FFFFFF",
  header: "#202016ff",
};



export const key ={
    IsLogin : "IsLogin"
}

export const apiName ={
    Login : "login",
    Register : "register",
    ForgotPassword : "forgotpassword",
    sendotp: "/api/auth/v1/send-signup-otp",
    rolefetch: "api/user/v1/role-fetch",
    getInfo :"/users",
    gePost : "/posts"
}


export const BASE_URLS = {
  store: "https://fakestoreapi.com",             
  user: "https://jsonplaceholder.typicode.com", 
};
