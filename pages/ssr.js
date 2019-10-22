import fetch from 'isomorphic-unfetch';
import NextStars from './../components/NextStars';

function SSRPage({ stargazers_count }) {
  return (
    <main>
      <NextStars stargazers_count={stargazers_count} useFetch={false} />
    </main>
  );
}

SSRPage.getInitialProps = async () => {
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

export default SSRPage;
