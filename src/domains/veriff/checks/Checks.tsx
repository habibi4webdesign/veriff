import { fetchChecks, submitCheckResults } from 'Api';
import Button from 'components/Button';
import Loading from 'components/Loading';
import Check from 'domains/veriff/check';
import React, { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useHistory } from 'react-router-dom';
import sort from 'utils/sort';
import styles from './Checks.module.scss';

const Checks = () => {
  const [checks, setchecks] = useState<ICheck[]>([]);
  const history = useHistory();
  const [status, setstatus] = useState<string>('loading');
  const [isSubmitDisabled, setisSubmitDisabled] = useState<boolean>(true);
  const [selectedCheck, setselectedCheck] = useState<number>(-1);

  const checkValidation = (checks: ICheck[]) => {
    if (checks.some((check) => check.answer === 'No')) {
      setisSubmitDisabled(false);
    } else if (checks.every((check) => check.answer === 'Yes')) {
      setisSubmitDisabled(false);
    } else {
      setisSubmitDisabled(true);
    }
  };

  const getChecks = () => {
    setisSubmitDisabled(true);
    setstatus('loading');
    fetchChecks()
      .then((res: ICheck[]) => {
        const sortedChecks: ICheck[] = sort(res, 'priority');

        const finalChecks = sortedChecks.map((check, index) => {
          return {
            ...check,
            answer: '',
            isDisabled: index === 0 ? false : true, //disables all checks except the first one 
          };
        });
        
        setchecks(finalChecks);
        setstatus('resolved');
      })
      .catch((err) => {
        if (!err.success) {
          setstatus('error');
        }
      });
  };

  useEffect(() => {
    //get initial checks data
    getChecks();
  }, []);


  useEffect(() => {
    // check if form can submitted or not
    checkValidation(checks);
  }, [checks]);

  useHotkeys(
    'down',
    () => {
      setselectedCheck((preSelectedCheck) => {
        if (
          preSelectedCheck < checks.length - 1 &&
          !checks[preSelectedCheck + 1].isDisabled
        ) {
          return preSelectedCheck + 1;
        }
        return preSelectedCheck;
      });
    },
    [checks],
  );

  useHotkeys('up', () => {
    setselectedCheck((preSelectedCheck) => {
      if (preSelectedCheck > 0) {
        return preSelectedCheck - 1;
      }
      return preSelectedCheck;
    });
  });

  useHotkeys('1', () => {
    setchecks((preCkecks) => {
      return preCkecks.map((check, index) => {
        if (index === selectedCheck) {
          return { ...check, answer: 'Yes' };
        } else if (index === selectedCheck + 1) {
          return { ...check, isDisabled: false };
        }
        return check;
      });
    });
  },[selectedCheck]);

  useHotkeys('2', () => {
    setchecks((preCkecks) => {
      return preCkecks.map((check, index) => {
        if (index === selectedCheck) {
          return { ...check, answer: 'No' };
        } else if (index === selectedCheck + 1) {
          return { ...check, isDisabled: true, answer: '' };
        }
        return check;
      });
    });
  },[selectedCheck]);

  if (status === 'error') {
    return <h1>oops! error Occurred, please try again!</h1>;
  }

  if (status === 'loading') {
    return <Loading isComponentLoading />;
  }

  const onSelectCheck = (answer: string, checkId: string) => {
    let answeredCheckIndex: number | null = null;

    const finalChecks = checks.map((check, index) => {
      if (check.id === checkId) {
        answeredCheckIndex = index;
        return { ...check, answer };
      } else if (answeredCheckIndex !== null) {
        return answeredCheckIndex + 1 === index && answer === 'Yes'
          ? { ...check, isDisabled: false, answer: '' }
          : { ...check, isDisabled: true, answer: '' };
      } else {
        return { ...check };
      }
    });

    setchecks(finalChecks);
  };

  const onSubmit = () => {
    const submitResults = checks.map((check) => ({
      checkId: check.id,
      value: check.answer,
    }));
    submitCheckResults(submitResults)
      .then((res: any) => {
        if (res.length) {
          history.push('/success');
        }
      })
      .catch(
        (err) => !err.success && alert('Error Occurred And Data Not Submited'),
      );
  };

  const onCheckMouseOver = (selectedCheck: number) => {
    setselectedCheck(selectedCheck);
  };

  return (
    <div className={styles.root}>
      {checks.map((check: ICheck, index) => (
        <Check
          onMouseOver={() => !check.isDisabled && onCheckMouseOver(index)}
          key={check.id}
          selected={selectedCheck === index}
          check={check}
          onSelect={onSelectCheck}
        />
      ))}
      <Button
        className={styles.submitBtn}
        onClick={onSubmit}
        disabled={isSubmitDisabled}
      >
        SUBMIT
      </Button>
    </div>
  );
};

export default Checks;
