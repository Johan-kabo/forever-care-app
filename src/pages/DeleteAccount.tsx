
import React, { useState } from "react";
import MobileLayout from "@/components/MobileLayout";
import { ChevronLeft, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const DeleteAccount = () => {
  const navigate = useNavigate();
  const [confirmText, setConfirmText] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (confirmText !== "SUPPRIMER") {
      toast.error("Veuillez écrire SUPPRIMER pour confirmer");
      return;
    }

    if (!isChecked) {
      toast.error("Veuillez confirmer que vous comprenez les conséquences");
      return;
    }
    
    // Here you would normally make an API call to delete the account
    toast.success("Votre compte a été supprimé");
    // Redirect to login or home page
    navigate("/");
  };

  return (
    <MobileLayout>
      {/* Header */}
      <div className="bg-health-primary text-white p-6 pt-5 pb-8 rounded-b-3xl mb-4">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="mr-4">
            <ChevronLeft size={24} className="text-white" />
          </button>
          <h1 className="text-xl font-semibold">Supprimer le compte</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start">
          <AlertTriangle size={24} className="text-red-500 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-red-700">Attention: Action irréversible</h3>
            <p className="text-sm text-red-600 mt-1">
              La suppression de votre compte est permanente et ne peut pas être annulée. Toutes vos données, y compris votre historique médical et vos rendez-vous, seront définitivement perdues.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 mb-1">
              Pour confirmer, écrivez "SUPPRIMER" ci-dessous
            </label>
            <input
              id="confirm"
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div className="flex items-start">
            <input
              id="understand"
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="mt-1 mr-2"
            />
            <label htmlFor="understand" className="text-sm text-gray-700">
              Je comprends que cette action est irréversible et que toutes mes données seront définitivement supprimées.
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-red-600 text-white rounded-xl hover:bg-red-700"
          >
            Supprimer définitivement mon compte
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 mt-4"
          >
            Annuler
          </button>
        </form>
      </div>
    </MobileLayout>
  );
};

export default DeleteAccount;
