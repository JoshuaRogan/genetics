<?php 
class question{
    public static $question_num = 0;
    public static $section_num = 0;
    public static $questions = Array(); 

    public static function create_question($question, $answer, $gif = false, $imgur = false){
        return self::generate_question_html($question, $answer, $gif, $imgur, false); 
    }

    public static function generate_question_html($question, $answer, $gif = false, $imgur = false, $echo = true){
        if($gif){
            $gif = "<img src='$gif' class='img-responsive'>";
        }

        if($imgur){
            $imgur = "<p><a href='$imgur'> <i class='fa fa-picture-o'></i><strong> View High Res Gif</strong></a></p>";
        }


        $html = "

        <div class='panel panel-primary' id='question-panel-" . self::$question_num . "'>
            <div class='panel-heading'>
                <h4 class='panel-title'>
                    <a class='accordion-toggle collapsed' data-toggle='collapse' data-parent='#accordion-" . (self::$section_num - 1) . "' href='#question-" . self::$question_num . "'>$question?</a>
                </h4>
            </div>
            <div id='question-" . self::$question_num . "' class='panel-collapse collapse'>
                <div class='panel-body'>
                    $answer
                    $imgur
                    $gif
                </div>
            </div>
        </div>
    ";
        self::$questions[self::$section_num][] = $html; 
        self::$question_num++;

        if($echo) echo $html;
        else return $html; 
    }

    public static function get_html($section_num){ 
        if(self::$questions[$section_num]){
            return self::$questions[$section_num]; 
        }
        else{
            return ['ERROR']; 
        }
        
    }
}
?>