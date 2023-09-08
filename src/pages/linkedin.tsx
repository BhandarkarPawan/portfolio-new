export const getServerSideProps = async () => {
    return {
        redirect: {
            destination: "https://www.linkedin.com/in/yourusername/",
            permanent: false,
        },
    };
};

const LinkedinRedirect = () => null;

export default LinkedinRedirect;
