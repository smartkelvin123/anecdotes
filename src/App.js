import React, { useState, useEffect } from "react";
import styled from "styled-components";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`;

const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;
`;

const Smart = styled.div`
  background: Chocolate;
  padding: 1em;
  margin-top: 1em;
`;

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`;

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <Page>
      <Navigation>
        <Link style={padding} to="/">
          anecdotes
        </Link>
        <Link style={padding} to="/create">
          create new
        </Link>
        <Link style={padding} to="/about">
          about
        </Link>
      </Navigation>
    </Page>
  );
};

const AnecdoteList = ({ anecdotes }) => (
  <Page>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </Page>
);

const About = () => (
  <Page>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>
    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>
    <p>
      Software engineering is full of excellent anecdotes, and with this app,
      you can find the best ones and even add more.
    </p>
  </Page>
);

const Footer = () => (
  <Smart>
    Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
    See{" "}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </Smart>
);

const CreateNew = ({ addNew }) => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [info, setInfo] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    let timer;
    if (showNotification) {
      timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showNotification]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content,
      author,
      info,
      votes: 0,
      id: Math.round(Math.random() * 10000),
    });
    setContent("");
    setAuthor("");
    setInfo("");
    setShowNotification(true);
    // history.push("/");
  };
  const handleClear = () => {
    setContent("");
    setAuthor("");
    setInfo("");
  };

  return (
    <div>
      <h2>Create a new anecdote</h2>
      {showNotification && <Notification />}
      <form onSubmit={handleSubmit}>
        <div>
          Content:
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          URL for more info:
          <input
            type="text"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
        </div>
        <Button type="submit"> create</Button>

        <Button type="button" onClick={handleClear}>
          Clear
        </Button>
      </form>
    </div>
  );
};

const SingleAnecdote = ({ anecdotes }) => {
  const { id } = useParams();
  const anecdote = anecdotes.find((a) => a.id === Number(id));

  if (!anecdote) {
    return <div>Anecdote not found</div>;
  }

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>Author: {anecdote.author}</p>
      <p>
        More info: <a href={anecdote.info}>{anecdote.info}</a>
      </p>
      <p>Votes: {anecdote.votes}</p>
    </div>
  );
};

const Notification = () => (
  <div>
    <p>Anecdote created successfully!</p>
  </div>
);

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const addNew = (anecdote) => {
    setAnecdotes(anecdotes.concat(anecdote));
  };

  return (
    <Page>
      <h1>Software anecdotes</h1>
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path="/about" element={<About />} />
          <Route path="/create" element={<CreateNew addNew={addNew} />} />
          <Route
            path="/anecdotes/:id"
            element={<SingleAnecdote anecdotes={anecdotes} />}
          />
        </Routes>

        <Footer />
      </Router>
    </Page>
  );
};

export default App;
