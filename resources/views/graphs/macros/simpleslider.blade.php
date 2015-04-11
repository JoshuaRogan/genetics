<div class="variable row">
	<div class="col-sm-3">
		<label>{!! $name !!}: <a href="#"><sup><i class="fa fa-question"></i></sup></a></label>
		
		<div class="help-block hidden">
			<div class="help-symbol-container">Symbol: <span class="help-symbol">{!! $symbol !!}</span> </div>
			<p>{!! $helper !!}</p>
		</div>

	</div>

	<div class="col-sm-6">
		<div id="{{$id}}-slider" class="slider"></div>
	</div>

	<div class="col-sm-3 value">
		<input type="text" class="form-control" id="{{$id}}" name="{{$id}}" placeholder="0">
	</div>
</div>