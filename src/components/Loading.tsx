function Loading(props: any) {
    return (
        <>
            {
                props.show &&
                <div id="loading">
                    Cargando...
                </div>
            }
        </>

    );
}

export default Loading;
