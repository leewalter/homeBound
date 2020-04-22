import React from 'react';

import { Modal } from 'modules/modal';
import { Button, BUTTON, Heading, HEADING } from 'components';
import { AddContact } from 'modules/contacts';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';

interface Props {
  isModalOpen: boolean;
  toggleModalState: VoidFunction;
}

export const AddContactModal: React.FC<Props> = ({
  isModalOpen,
  toggleModalState,
}) => {
  return (
    <Modal isModalOpen={isModalOpen}>
      <section className="contactModal l-page">
        <aside className="u-f--spaceBetween u-sb-12">
          <Heading tag="h1" className={HEADING.PRIMARY.XXLARGE.LIGHT}>
            Add Contact
          </Heading>
          <Button
            icon={<PlusIcon />}
            className={BUTTON.ROUNDED.CTA.LARGE.GLOW}
            onClick={toggleModalState}
          />
        </aside>
        <div className="u-t__fontSize--small u-o-6 u-sr-32 u-sb-28">
          Keep track of people you see and don't forget to check up on them
        </div>
        <main className="l-vertical u-f--grow1">
          <AddContact callback={toggleModalState} />
        </main>
      </section>
    </Modal>
  );
};
