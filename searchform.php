<?php
$value = '';
if ( is_category() ) :
	$value = single_cat_title( '', false );
elseif ( is_tag() ) :
	$value = single_tag_title( '', false );
elseif ( is_author() ) :
	$value = get_the_author_meta('display_name', $GLOBALS['post']->post_author);
elseif ( is_day() ) :
	$value = get_the_time('l, F j, Y');
elseif ( is_month() ) :
	$value = get_the_time('F Y');
elseif ( is_year() ) :
	$value = get_the_time('Y');
elseif ( $search = get_query_var('s') ) :
	$value = $search;
endif;
?><form role="search" method="get" id="searchform" action="<?php echo home_url( '/' ); ?>">
    <div>
        <input type="text" value="<?php echo $value; ?>" name="s" id="s" />
        <button type="submit" id="searchsubmit">
    		<span class="icon-search" aria-hidden="true"></span>
    		<span class="screen-reader-text">Submit</span>
        </button>
    </div>
</form>