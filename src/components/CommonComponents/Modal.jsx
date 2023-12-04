

const Modal = ({ modalId, modalTitle, children }) => {
    return (
        /* You can open the modal using document.getElementById('ID').showModal() method */
        <dialog id={modalId} className="modal " >
            <div className="modal-box w-11/12 max-w-5xl">
                
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal  */}
                    <button className="btn btn-sm btn-primary
                     btn-circle  absolute top-1 right-1 overflow-visible z-20">✕</button>
                </form>
                {/* modal title */}
                <div className="border-b">
                    <h3 className="font-bold text-lg">{modalTitle}</h3>
                </div>
                {/* modal content */}
                <div className="mt-2 ">
                    {children}
                </div>




            </div>

        </dialog>
    );
};

export default Modal;