import './App.css';
import {useState, useEffect} from "react";

const query = `
{
  reactPageCollection {
    items {
      title
      logo {
        url
      }
    }
  }
}
`;

const contentful_space = process.env.REACT_APP_SPACE_ID;
const contentful_access_token = process.env.REACT_APP_ACCESS_TOKEN;

function App() {
  const [page, setPage] = useState(null);
  useEffect(() => {
    window
      .fetch(`https://graphql.contentful.com/content/v1/spaces/${contentful_space}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authenticate the request
          Authorization: "Bearer "+ contentful_access_token,
        },
        // send the GraphQL query
        body: JSON.stringify({ query }),
      })
      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }
        console.log("process.env = " + process.env);
        console.log("space + token = " + contentful_space + ' ' + contentful_access_token);

        // rerender the entire component with new data
        setPage(data.reactPageCollection.items[0]);
      });
  }, []);

  if (!page) {
    return "Loading...";
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={page.logo.url} className="App-logo" alt="logo" />
        <p>{page.title}</p>
      </header>
    </div>
  );
}

export default App;
