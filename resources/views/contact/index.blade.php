@extends('skeleton.base')
@extends('skeleton.default_header')
@extends('skeleton.default_footer')

@section('title', 'Contact Us')
@section('pageclass', 'page-contact')

@section('styles')
	@parent
@stop

@section('lazyscripts')
	@parent

@stop

@section('content')
<div class='container' id='material-form'>
		{!! Form::open(['route' => ['contact.send'], 'id'=>'form-contact']) !!}
 					<h3> Contact Us </h3>
					<div class="form-group {{ $errors->has('name') ? 'has-error' : '' }}"> 
						{!! Form::label('name', 'Name*', ['class' => 'control-label']) !!}
						{!! Form::text('name', null, ['class' => 'form-control floating-label', 'placeholder' => 'e.g. John Doe', 'required'=>'required']) !!}
						{!! $errors->first('name', '<span class="help-block">:message</span>')!!}
					</div>

					<div class="form-group {{ $errors->has('email') ? 'has-error' : '' }}"> 
						{!! Form::label('email', 'Email*', ['class' => 'control-label']) !!}
						{!! Form::email('email', null, ['class' => 'form-control floating-label', 'placeholder' => 'e.g. john.doe@pitt.edu', 'required'=>'required']) !!}
						{!! $errors->first('email', '<span class="help-block">:message</span>')!!}
					</div>

					<div class="form-group {{ $errors->has('email_confirmation') ? 'has-error' : '' }}"> 
						{!! Form::label('email_confirmation', 'Verify Email Address*', ['class' => 'control-label']) !!}
						{!! Form::email('email_confirmation', null, ['class' => 'form-control floating-label', 'placeholder' => 'e.g. john.doe@pitt.edu', 'required'=>'required']) !!}
						{!! $errors->first('email_confirmation', '<span class="help-block">:message</span>')!!}
					</div>

					<div class="form-group {{ $errors->has('subject') ? 'has-error' : '' }}"> 
						{!! Form::label('subject', 'Subject*', ['class' => 'control-label']) !!}
						{!! Form::text('subject', null, ['class' => 'form-control floating-label', 'placeholder' => 'e.g. Drift Question', 'required'=>'required']) !!}
						{!! $errors->first('subject', '<span class="help-block">:message</span>')!!}
					</div>

					<div class="form-group {{ $errors->has('message') ? 'has-error' : '' }}"> 
						{!! Form::label('message', 'Message Body*', ['class' => 'control-label']) !!}
						{!! Form::textarea('message', null, ['class' => 'form-control floating-label', 'placeholder' => 'e.g. Write your message here', 'required'=>'required']) !!}
						{!! $errors->first('message', '<span class="help-block">:message</span>')!!}
					</div>

					<div class="form-group"> 
						<button type="submit" class="form-control btn btn-primary btn-flat pull-right "><i class="fa fa-paper-plane"></i> Send</button>
					</div>

					<div class='clearfix'></div>
		{!! Form::close() !!}
</div>
@stop