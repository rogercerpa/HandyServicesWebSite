import { Award, Clock, Users, ThumbsUp } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "500+",
    label: "Happy Customers",
    description: "Homeowners trust us",
  },
  {
    icon: Clock,
    value: "10+",
    label: "Years Experience",
    description: "In the industry",
  },
  {
    icon: ThumbsUp,
    value: "98%",
    label: "Satisfaction Rate",
    description: "5-star reviews",
  },
  {
    icon: Award,
    value: "1,200+",
    label: "Jobs Completed",
    description: "And counting",
  },
];

export function TrustIndicators() {
  return (
    <section className="py-16 bg-charcoal-900 border-y border-charcoal-800">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.label} 
                className="text-center group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-electric/10 rounded-2xl mb-4 group-hover:bg-electric/20 transition-colors">
                  <Icon className="w-8 h-8 text-electric" />
                </div>
                <div className="font-heading text-3xl md:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="font-semibold text-white mb-1">{stat.label}</div>
                <div className="text-sm text-charcoal-400">{stat.description}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

