import { TextControl, Flex, FlexBlock, FlexItem, Button, Icon, PanelBody, PanelRow } from "@wordpress/components";
import { InspectorControls, BlockControls, AlignmentToolbar, useBlockProps } from "@wordpress/block-editor";
import { ChromePicker } from "react-color";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {

    // Block properties
    const blockProps = useBlockProps({
        className: "paying-attention-edit-block",
        style: { backgroundColor: attributes.bgColor }
    });

    /**
     * Update the question attribute
     * 
     * @param {string} value 
     */
    function updateQuestion(value) {
        setAttributes({
            question: value
        });
    }

    /**
     * Delete an answer
     * 
     * @param {number} indexToDelete 
     */
    function deleteAnswer(indexToDelete) {

        // Filter out the answer that was deleted
        const newAnswers = attributes.answers.filter(function (answer, index) {
            return index != indexToDelete
        });

        // Update the answers attribute
        setAttributes({
            answers: newAnswers
        });

        // If the correct answer was deleted, remove the correct answer
        if (indexToDelete == attributes.correctAnswer) {
            setAttributes({
                correctAnswer: undefined
            });
        }
    }

    /**
     * Mark an answer as correct
     *
     * @param {number} index
     */
    function markAsCorrect(index) {
        setAttributes({
            correctAnswer: index
        });
    }

    return (
        <div {...blockProps} >
            <BlockControls>
                <AlignmentToolbar value={attributes.alignment} onChange={alignment => {
                    setAttributes({
                        alignment
                    });
                }} />
            </BlockControls>
            <InspectorControls>
                <PanelBody title="Background color" initialOpen={true}>
                    <PanelRow>
                        <ChromePicker color={attributes.bgColor} disableAlpha={true} onChangeComplete={color => {
                            setAttributes({
                                bgColor: color.hex
                            });
                        }} />
                    </PanelRow>
                </PanelBody>
            </InspectorControls>
            <TextControl
                label="Question:"
                value={attributes.question}
                onChange={updateQuestion}
                style={{ fontSize: "20px" }} />
            <p style={{ fontSize: "13px", margin: "20px 0 8px 0" }}>Answers:</p>
            {attributes.answers.map((answer, index) => {
                return (
                    <Flex>
                        <FlexBlock>
                            <TextControl value={answer} onChange={newValue => {
                                // Copy the answers array
                                const newAnswers = attributes.answers.concat([]);

                                // Update the value of the answer at the current index
                                newAnswers[index] = newValue;

                                // Update the answers attribute
                                setAttributes({
                                    answers: newAnswers
                                });
                            }} />
                        </FlexBlock>
                        <FlexItem>
                            <Button>
                                <Icon
                                    onClick={() => markAsCorrect(index)}
                                    className="mark-as-correct"
                                    icon={attributes.correctAnswer == index ? "star-filled" : "star-empty"} />
                            </Button>
                        </FlexItem>
                        <FlexItem>
                            <Button variant="link" className="attention-delete" onClick={() => deleteAnswer(index)}>
                                Delete
                            </Button>
                        </FlexItem>
                    </Flex>
                )
            })}
            <Button variant="primary" onClick={() => {
                setAttributes({
                    answers: attributes.answers.concat([""])
                })
            }}>Add another answer</Button>
        </div>
    );
}
