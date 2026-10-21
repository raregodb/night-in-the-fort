import {useRouteError} from "react-router-dom";
import Layout from "@/components/Layout.jsx";
import {EmptyState} from "@/components/Status.jsx";

export default function ErrorPage () {
    const error = useRouteError();

    return (
        <Layout>
            <EmptyState title="Что-то пошло не так" description={error?.message} to="/" action="На главную" />
        </Layout>
    )
}
