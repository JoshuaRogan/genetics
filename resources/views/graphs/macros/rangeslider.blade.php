<div class="variable row range-slider">
	<div class="col-sm-3">
		<label>{{$name}}: <a href="#"><sup><i class="fa fa-question"></i></sup></a></label>
		<p class="help-block hidden">{{$helper}}</p>
	</div>

	<div class="col-sm-5">
		<div id="{{$id}}-slider" class="slider"></div>
	</div>

	<div class="col-sm-2 value">
		<input type="text" class="form-control" id="{{$id}}-lower" name="{{$id}}-lower" placeholder="0">
	</div>

	<div class="col-sm-2 value">
		<input type="text" class="form-control" id="{{$id}}-upper" name="{{$id}}-upper" placeholder="0">
	</div>
</div>