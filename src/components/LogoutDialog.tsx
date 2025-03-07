
import React from "react";

interface LogoutDialogProps {
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutDialog = ({ onClose, onConfirm }: LogoutDialogProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 mx-4 max-w-sm">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Êtes-vous sûr de vouloir vous déconnecter ?
          </h2>
        </div>
        
        <div className="flex flex-col gap-3">
          <button
            onClick={onConfirm}
            className="w-full py-3 border border-health-primary text-health-primary font-medium rounded-xl"
          >
            Déconnecter
          </button>
          
          <button
            onClick={onClose}
            className="w-full py-3 bg-health-primary text-white font-medium rounded-xl"
          >
            Annuler
          </button>
          
          <div className="w-12 h-1 bg-black mx-auto mt-4 rounded-full opacity-20"></div>
        </div>
      </div>
    </div>
  );
};

export default LogoutDialog;
