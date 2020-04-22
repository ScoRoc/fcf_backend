import React from 'react';
import TextAreaCharCount from './TextAreaCharCount';

const TwoStateTextTACC = props => {
  const {
    allowTypingPastLimit,
    charLimit,
    focusTextarea,
    handleKeyUp,
    liftText,
    pClass,
    taccDivClass,
    taccPClass,
    taccTextareaClass,
    text,
    useTACC,
    wrapperClass
  } = props;
  const displayText = useTACC
                    ? <TextAreaCharCount
                        allowTypingPastLimit={allowTypingPastLimit}
                        charLimit={charLimit}
                        focusTextarea={focusTextarea}
                        handleKeyUp={handleKeyUp}
                        liftText={liftText}
                        text={text}
                        divClass={taccDivClass}
                        pClass={taccPClass}
                        textareaClass={taccTextareaClass}
                      />
                    : <p className={pClass}>
                        {text}
                      </p>;
  return (
    <div className={wrapperClass}>
      {displayText}
    </div>
  );
}

export default TwoStateTextTACC;
