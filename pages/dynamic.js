import dynamic from 'next/dynamic';
import fetch from 'isomorphic-unfetch';

const NextStars = dynamic(() => import('./../components/NextStars'), {
  loading: () => <p>LOADING APP...</p>,
});

function Dynamic({ stargazers_count }) {
  const [showApp, setShowApp] = React.useState(false);
  return (
    <main>
      {showApp ? (
        <NextStars stargazers_count={stargazers_count} useFetch />
      ) : (
        <button onClick={setShowApp.bind(true)}>Show App</button>
      )}
    </main>
  );
}
Dynamic.getInitialProps = async () => {
  let json = { stargazers_count: 'Loading...' };
  try {
    const res = await fetch('https://api.github.com/repos/zeit/next.js');
    json = await res.json();
  } catch (error) {
    console.error('An error was encountered:', error);
    json = { stargazers_count: 'An error was encountered. #sorryNotSorry' };
  }
  return json;
};

export default Dynamic;
