<div class="variable row">
		<div class="col-sm-3">
			<label>{{$name}}:<a href="#"><sup><i class="fa fa-question"></i></sup></a></label>

			<div class="help-block hidden">
				<div class="help-symbol-container"><span class="help-symbol">{{$symbol}}</span> </div>
				<p>{{$helper}}</p>
			</div>

		</div>

		<div class="col-sm-4">
			<div id="{{$id}}-slider" class="slider"></div>
		</div>

		<div class="col-sm-2 value">
			<input type="text" class="form-control" id="{{$id}}" name="{{$id}}" placeholder="0">
		</div>

		
		<div class="col-sm-3 scientific-notation-container"> 

			<div class="col-xs-6 scientific-notation">x10^</div>
			
			<div class="col-xs-6 form-group text-center scientific-form-group">
			  <select class="form-control mutation-exponent" id="{{$id}}-exponent" name="{{$id}}-exponent">
			    <option>-1</option>
			    <option>-2</option>
			    <option>-3</option>
			    <option>-4</option>
			    <option selected="selected">-5</option>
			    <option>-6</option>
			    <option>-7</option>
			    <option>-8</option>
			    <option>-9</option>
			    <option>-10</option>
			  </select>
			</div>
		</div>
</div>