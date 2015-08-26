@extends('skeleton.base')
@extends('skeleton.default_header')
@extends('skeleton.default_footer')

@section('title', 'Allele Graphing')
@section('description', 'The Department of Human Genetics at the University of Pittsburgh\'s Graduate School of Public Health is dedicated to genetics research, teaching, and services. The department has three major research missions, which are (1) to develop and use genetic methods to investigate the causes and treatment of hereditary and acquired human illness, (2) to understand and explore the impact of genetics on public health, education, and disease prevention, and (3) to appreciate the role of genetic diversity within human populations.')
@section('pageclass', 'page-report-problem')
@stop

@section('styles')
  @parent
@stop

@section('lazyscripts')
  @parent
@stop

@section('content')


<div class="container">&nbsp;</div>
<div class="container"> 
  <div class="alert alert-info" role="alert">If you haven't filed a bug report before please refer to <strong><a href="https://developer.mozilla.org/en-US/docs/Mozilla/QA/Bug_writing_guidelines" target="_blank">Mozilla Developer Network Guidelines</a></strong> </div>
  
  <h2> Report a Problem </h2>
  <form id="form-contact" role="form" action='/report-problem/store' method='POST'>

    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" class="form-control" id="name" placeholder="John Doe" name='name' required>
    </div>

    <div class="form-group">
      <label for="email">Email address</label>
      <input type="email" class="form-control" id="email" placeholder="Enter your email" name='email' required>
    </div>  

    <div class="form-group">
      <label for="verify_email">Verify Email address</label>
      <input type="email" class="form-control" id="verify_email" placeholder="Enter your email" name='verify_email' required>
    </div>

    <div class="form-group">
      <label for="subject">Subject</label>
      <input type="text" class="form-control" id="subject" placeholder="Subject" value="" name='subject' required>
    </div>

    <div class="form-group">
    <label for="message">Please enter your bug report or general comments here. Please be descriptive as you can. If possible please include the <strong style="color: #e74c3c">browser</strong> and <strong style="color: #e74c3c">operating system</strong> (version numbers included if possible).</label>
      <textarea class="form-control" id="message" placeholder="Please entered your deatiled bug report here." rows="8" name='message' required></textarea>
    </div>

    <input type="hidden" name="_token" value="<?php echo csrf_token(); ?>">

    <button  class="btn btn-primary" id="submit">Submit</button>
  </form>
</div>
@stop