<div class="container"> 
  <h2> Report a Problem </h2>
  <form id="form-contact" role="form">

    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" class="form-control" id="name" placeholder="John Doe" required>
    </div>

    <div class="form-group">
      <label for="email">Email address</label>
      <input type="email" class="form-control" id="email" placeholder="Enter your email" required>
    </div>  

    <div class="form-group">
      <label for="verify_email">Verify Email address</label>
      <input type="email" class="form-control" id="verify_email" placeholder="Enter your email" required>
    </div>

    <div class="form-group">
      <label for="subject">Subject</label>
      <input type="text" class="form-control" id="subject" placeholder="Subject" value="" required>
    </div>

    <div class="form-group">
      <textarea class="form-control" id="message" placeholder="Please enter your message here" rows="8" required></textarea>
    </div>

    <button  class="btn btn-primary" id="submit">Submit</button>
  </form>
</div>