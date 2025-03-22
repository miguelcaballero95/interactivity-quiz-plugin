/**
 * WordPress dependencies
 */
import { store, getContext } from '@wordpress/interactivity';

const { state } = store('create-block', {
    state: {
        get themeText() {
            return state.isDark ? state.darkText : state.lightText;
        },
    },
    actions: {
        guessAttempt() {
            const context = getContext();

            if (!context.solved) {
                if (context.index === context.correctAnswer) {
                    context.showCongrats = true;
                    state.solvedCount++;
                    setTimeout(() => {
                        context.solved = true;
                    }, 1000);
                } else {
                    context.showSorry = true;
                    setTimeout(() => {
                        context.showSorry = false;
                    }, 2600)
                }
            }
        }
    },
    callbacks: {
        fadedClass() {
            const context = getContext();
            return context.solved && !context.correct;
        },
        noClickClass() {
            const context = getContext();
            return context.solved && context.correct;
        }
    }
});
