import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";
import Head from "next/head";
import NewsletterRegistration from "@/components/input/newsletter-registration";

function HomePage(props) {
  return (
    <div>
      <Head>
        <title>Events List</title>
        <meta name="description" content="Event list project" />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </div>
  );
}

export default HomePage;

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  // console.log(featuredEvents);
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}
