import { useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';
import Section from './Section';
import ContactForm from './ContactForm';
import Contacts from './Contacts';

const LOCAL_KEY = 'phonebookContacts';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const didRender = useRef(false);
  useEffect(() => {
    let localContacts = localStorage.getItem(LOCAL_KEY);
    localContacts = localContacts ? JSON.parse(localContacts) : [];
    setContacts([...localContacts]);
  }, []);

  useEffect(() => {
    if (!didRender.current) {
      didRender.current = true;
      return;
    }
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const onGetDataForm = (data) => {
    const hasName = contacts.some(it => it.name === data.name);
    if (hasName) {
      Notify.warning (`Contact "${data.name}" is already exist.`);
      return;
    }

    setContacts(p => [...p, { ...data, id: nanoid() }]);
  };

  const deleteItem = (deletedId) => {
    setContacts(p => p.filter(({ id }) => id !== deletedId));
  };

  return (
    <div>
      <Section title='Phonebook'>
        <ContactForm
          onSubmit={onGetDataForm}
        />
      </Section>
      <Section title='Contacts'>
        <Contacts
          contacts={contacts}
          onClickDelete={deleteItem}
        />
      </Section>
    </div>
  );
}
