<div class="card small col-md-6">
    <div class="card-image">
        <img class="activator" src="/images/slide-bg-opt.jpg">
    </div>
    <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">Unit {{$unit}} - {{$title}}<i class="fa fa-ellipsis-v pull-right font-blue"></i></span>
                        
        <div><a href="/slides/{{$folder}}" target="_blank" > View Slides Online </a></div>
        <div><a href="/downloads/{{$folder}}.pptx" target="_blank" > Download All Slides </a></div>
        
    </div>
    <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">Close <i class="fa fa-times pull-right font-red"></i></span>
        <p>Please feel free to download or view the slides online for Unit {{$unit}} - {{$title}} </p>
        <div><a href="/slides/{{$folder}}" target="_blank" > View Slides Online </a></div>
        <div><a href="/downloads/{{$folder}}.pptx" target="_blank" > Download All Slides </a></div>
    </div>
</div>