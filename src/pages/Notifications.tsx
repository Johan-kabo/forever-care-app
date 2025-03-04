
import React from "react";
import { ArrowLeft, Search, Calendar, FileText, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";

const Notifications = () => {
  const notificationsData = [
    {
      date: "aujourd'hui",
      items: [
        {
          id: 1,
          title: "Rendez-vous programmé",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
          time: "2min",
          icon: <Calendar className="text-white" />,
          type: "appointment"
        },
        {
          id: 2,
          title: "Changement Programmé",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
          time: "2h",
          icon: <Calendar className="text-white" />,
          type: "change"
        },
        {
          id: 3,
          title: "Notes Médicales",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
          time: "3h",
          icon: <FileText className="text-white" />,
          type: "medical"
        },
        {
          id: 4,
          title: "Notes Médicales",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
          time: "3h",
          icon: <FileText className="text-white" />,
          type: "medical"
        }
      ]
    },
    {
      date: "hier",
      items: [
        {
          id: 5,
          title: "Rendez-vous programmé",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
          time: "1j",
          icon: <Calendar className="text-white" />,
          type: "appointment"
        },
        {
          id: 6,
          title: "Mise À Jour Des Antécedents Médicaux",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
          time: "1j",
          icon: <MessageCircle className="text-white" />,
          type: "update"
        }
      ]
    }
  ];

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-screen bg-white">
        {/* Header */}
        <div className="bg-health-primary text-white px-4 py-4 flex items-center">
          <Link to="/" className="mr-4">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-bold flex-1 text-center mr-8">Notifications</h1>
        </div>

        {/* Search bar */}
        <div className="px-4 py-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-100 text-gray-600 rounded-full py-3 pl-10 pr-4 focus:outline-none"
            />
          </div>
        </div>

        {/* Notifications list */}
        <div className="flex-1 px-4 pb-20">
          {notificationsData.map((section, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-black font-medium">{section.date}</h2>
                {index === 0 && (
                  <button className="text-health-primary text-sm">
                    Tout marquer comme lu
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {section.items.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`flex items-start p-3 rounded-xl ${
                      notification.type === "medical" ? "bg-[#E5DEFF]" : "bg-white border border-gray-200"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-health-primary flex items-center justify-center mr-3 flex-shrink-0">
                      {notification.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-base">{notification.title}</h3>
                      <p className="text-sm text-gray-500">{notification.description}</p>
                    </div>
                    <div className="text-sm text-gray-500 ml-2">
                      {notification.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};

export default Notifications;
