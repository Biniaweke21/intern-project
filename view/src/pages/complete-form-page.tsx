import { useParams } from "react-router-dom";

export default function CompleteFormPage() {
    const params = useParams();
    console.log(params)
    return (
        <main>
            <h3>Paramas aform</h3>
            <h1>{JSON.stringify(params.id)}</h1>
        </main>
    );
}