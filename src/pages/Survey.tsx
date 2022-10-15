import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/UI/Button';
import { useTranslations } from '../hooks/useTranslations';
import classes from './Survey.module.scss';
export const Survey = () => {
  // boolean isCorrect нужен на будущее когда из этого будут выставлять баллы насколько болен человек
  const questions = [
    {
      questionText: 'Замечали ли Вы резкий, нецеленаправленный набор веса за последнее время?',
      answerOptions: [
        { answerText: 'Всегда', isCorrect: false },
        { answerText: 'Никогда', isCorrect: false },
        { answerText: 'Иногда', isCorrect: true },
      ],
    },
    {
      questionText: 'Замечали ли Вы появление оттеков на коже?',
      answerOptions: [
        { answerText: 'Всегда', isCorrect: false },
        { answerText: 'Никогда', isCorrect: false },
        { answerText: 'Иногда', isCorrect: true },
      ],
    },
    {
      questionText: 'Присутствует ли у Вас хроническая усталость или сонливость?',
      answerOptions: [
        { answerText: 'Всегда', isCorrect: false },
        { answerText: 'Никогда', isCorrect: false },
        { answerText: 'Иногда', isCorrect: true },
      ],
    },
    {
      questionText: 'Замечали ли Вы медленное поверхностное дыхание (не можете глубоко вдохнуть)?',
      answerOptions: [
        { answerText: 'Всегда', isCorrect: false },
        { answerText: 'Никогда', isCorrect: false },
        { answerText: 'Иногда', isCorrect: true },
      ],
    },
    {
      questionText: 'Испытываете ли задержки мочеиспускания?',
      answerOptions: [
        { answerText: 'Всегда', isCorrect: false },
        { answerText: 'Никогда', isCorrect: false },
        { answerText: 'Иногда', isCorrect: true },
      ],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerOptionClick = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };
  const navigate = useNavigate();
  const [isPressed, setIsPressed] = useState(false);
  const handleOnClick = () => {
    navigate('/patient');
  };
  const { t } = useTranslations();

  return (
    // <div className={classes['cont']}>
    <div className={classes['app']}>
      {showScore ? (
        <div>
          <div className={classes['score-section']}>Спасибо за ответы!</div>
          <Button variant={'tertiary'} onClick={handleOnClick}>
            {t('Назад').toUpperCase()}
          </Button>
        </div>
      ) : (
        <>
          <div className={classes['question-section']}>
            <div className={classes['question-count']}>
              <span>Вопрос {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className={classes['question-text']}>
              {questions[currentQuestion].questionText}
            </div>
          </div>
          <div className={classes['answer-section']}>
            {questions[currentQuestion].answerOptions.map((answerOption) => (
              <button className={classes["bu"]} onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>
                {answerOption.answerText}
              </button>
            ))}
          </div>
        </>
      )}
    </div>

    // </div>
  );
};
