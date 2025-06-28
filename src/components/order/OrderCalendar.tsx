
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, Clock, Users } from "lucide-react";

interface OrderCalendarProps {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  isDateAvailable: (date: Date) => boolean;
  getAvailableSlots: (date: Date) => number;
}

const OrderCalendar = ({ selectedDate, onDateSelect, isDateAvailable, getAvailableSlots }: OrderCalendarProps) => {
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 14); // 2 weeks ahead

  const isDateDisabled = (date: Date) => {
    const isPast = date < today;
    const isTooFar = date > maxDate;
    const isUnavailable = !isDateAvailable(date);
    return isPast || isTooFar || isUnavailable;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
      {/* Calendar */}
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm border-0">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center mb-4 sm:mb-6">
            <CalendarIcon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 mr-2 sm:mr-3" />
            <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
              Choisissez votre date
            </h2>
          </div>
          
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateSelect}
            disabled={isDateDisabled}
            className="rounded-lg pointer-events-auto"
          />
          
          <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
            <div className="flex items-center text-xs sm:text-sm text-gray-600">
              <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
              Disponible
            </div>
            <div className="flex items-center text-xs sm:text-sm text-gray-600">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              Complet
            </div>
            <div className="flex items-center text-xs sm:text-sm text-gray-600">
              <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
              Indisponible
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Information Panel */}
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm border-0">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center mb-4 sm:mb-6">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 mr-2 sm:mr-3" />
            <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
              Informations de livraison
            </h2>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-3 sm:p-4 rounded-xl">
              <h3 className="font-semibold text-emerald-800 mb-2 text-sm sm:text-base">
                Créneaux disponibles
              </h3>
              <p className="text-xs sm:text-sm text-emerald-700 leading-relaxed">
                Commandez jusqu'à 14 jours à l'avance. Les livraisons se font tous les jours de 11h à 19h.
              </p>
            </div>

            {selectedDate && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 sm:p-4 rounded-xl">
                <div className="flex items-center mb-2">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-2" />
                  <h3 className="font-semibold text-blue-800 text-sm sm:text-base">
                    Places disponibles
                  </h3>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-blue-700">
                  {getAvailableSlots(selectedDate)}
                </p>
                <p className="text-xs sm:text-sm text-blue-600">
                  repas disponibles pour le {selectedDate.toLocaleDateString('fr-FR')}
                </p>
              </div>
            )}

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-3 sm:p-4 rounded-xl">
              <h3 className="font-semibold text-amber-800 mb-2 text-sm sm:text-base">
                Note importante
              </h3>
              <p className="text-xs sm:text-sm text-amber-700 leading-relaxed">
                Les commandes sont préparées fraîchement chaque jour selon la capacité de notre cuisine.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderCalendar;
