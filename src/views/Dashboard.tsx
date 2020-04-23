import * as React from 'react';
import { Redirect } from 'react-router-dom';

import { useSettingsServices } from 'modules/settings';
import { LogOut, useUserServices } from 'modules/user';
import { AddActivity } from 'modules/activities';
import {
  IncrementScore,
  useScoreListener,
  useScoreServices,
  ScoreTracker,
} from 'modules/score';
import { ContactSummary } from 'modules/contacts';
import { useAppState } from 'modules/app';
import { Heading, HEADING, Card } from 'components';

const Dashboard: React.FC = () => {
  const [{ userData }] = useUserServices();
  const [{ userSettings }] = useSettingsServices();
  const [{ userScore }, { getScoreHistory }] = useScoreServices();
  const [, { setAppTheme }] = useAppState();

  useScoreListener(userData);

  React.useEffect(() => {
    if (userData) {
      setAppTheme({
        color: '#F7CE53',
        shapeClass: 'app__deco--default',
        showNav: true,
      });
    }
  }, [setAppTheme, userData]);

  if (!userData) return <Redirect to="/login" />;

  if (userSettings && !userSettings.surveyCompleted)
    return <Redirect to="/welcome" />;

  return (
    <section className="app__content">
      <aside className="u-f--spaceBetween u-sb-12">
        <Heading tag="h1" className={HEADING.PRIMARY.XXLARGE.LIGHT}>
          Stayin'
          <br />
          indoors
        </Heading>
        <ScoreTracker mode="small" />
      </aside>
      <ContactSummary />
      <AddActivity />

      <strong>Update score realtime: </strong>
      {userScore && userScore.score}
      <IncrementScore user={userData} />
      <strong>Update user history on demand:</strong>
      <button onClick={getScoreHistory}>Update</button>
      {userScore?.history?.map(({ score, title }) => (
        <div>
          {title}: {score} points
        </div>
      ))}
      <LogOut />
    </section>
  );
};

export { Dashboard };
