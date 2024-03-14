<template>
 <div class="about">
 <h1>This is an login page</h1>
 <div class="container">
 <div class="row">
 <div class="col-sm"></div>
 <div class="col-sm">
 <form>
 <div class="form-group">
 <label for="exampleInputEmail1">Email address</label>
 <input type="email" class="form-control"
id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter
email" />
 <small id="emailHelp" class="form-text text-muted" >We'll
never share your email with anyone else.</small>
 </div>
 <div class="form-group">
 <label for="exampleInputPassword1">Password</label>
 <input type="password" class="form-control"
id="exampleInputPassword1" placeholder="Password" />
 </div>
 <button type="submit" class="btn btn-primary">Submit</button>
 </form>
 </div>
 <div class="col-sm"></div>
 </div>
 </div>
 </div>
</template>

<style scoped>

.about{
    background-image: url('../assets/pozadina2.jpg');
    background-size: cover;
    background-position: center;
    padding: 20px;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

form {
    padding: 20px;
    border-radius: 10px;
}
</style>