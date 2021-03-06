import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import AddProjectForm from "./AddProjectForm";
import DeleteProjectForm from "./DeleteProjectForm";
import EditProjectForm from "./EditProjectForm";
import AddTaskForm from "./tasks/AddTaskForm";
import DeleteTaskForm from "./tasks/DeleteTaskForm";
import EditTaskForm from "./tasks/EditTaskForm";

function Modal() {
  const { isOpen, activeForm } = useSelector((state) => state.modal);

  const chooseForm = () => {
    switch (activeForm) {
      case "addProject":
        return <AddProjectForm />;
      case "deleteProject":
        return <DeleteProjectForm />;
      case "editProject":
        return <EditProjectForm />;
      case "addTask":
        return <AddTaskForm />;
      case "deleteTask":
        return <DeleteTaskForm />;
      case "editTask":
        return <EditTaskForm />;
      default:
        return null;
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={() => null}>
        <div className="min-h-screen px-4 text-center bg-slate-500/50">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded">
              {chooseForm()}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;
