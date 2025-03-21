<?php
$answers = [];
for ( $i = 0; $i < count( $attributes['answers'] ); $i++ ) {
	$answers[] = [ 
		'index' => $i,
		'text' => $attributes['answers'][ $i ],
		'correct' => $i == $attributes['correctAnswer']
	];
}
$custom_context = [ 
	'solved' => false,
	'showCongrats' => false,
	'showSorry' => false,
	'correctAnswer' => $attributes['correctAnswer'],
	'answers' => $answers
];
?>
<div class="paying-attention-frontend" style="background-color: <?php echo $attributes['bgColor']; ?>"
	data-wp-interactive="create-block" <?php echo wp_interactivity_data_wp_context( $custom_context ); ?>>
	<p><?php echo $attributes['question']; ?></p>
	<ul>
		<?php foreach ( $custom_context['answers'] as $answer ) : ?>
			<li <?php echo wp_interactivity_data_wp_context( $answer ); ?> data-wp-on--click="actions.guessAttempt">
				<?php echo $answer['text']; ?>
			</li>
		<?php endforeach; ?>
		<!-- <template data-wp-each="context.answers">
			<li data-wp-on--click="actions.guessAttempt" data-wp-text="context.item"></li>
		</template> -->
	</ul>
	<div class="incorrect-message" data-wp-class--incorrect-message>
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="bi bi-emoji-frown" viewBox="0 0 16 16">
			<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
			<path
				d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
		</svg>
		<p>Sorry, try again.</p>
	</div>
</div>