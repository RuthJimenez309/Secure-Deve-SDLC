    export interface InfrastructureMetrics {
    unpatchedFirewalls: number;
    previousIncidents: number;
    intrusionAttempts: number;
    }

    export interface NistAssessment {
    score: number;
    maturityTier: string;
    recommendations: string[];
    }

    export class NistAssessmentEngine {
    public static evaluateRisk(metrics: InfrastructureMetrics): NistAssessment {
        const totalFlaws = (metrics.unpatchedFirewalls * 3) + (metrics.previousIncidents * 5) + (metrics.intrusionAttempts * 0.5);
        let score = 100 - totalFlaws;
        
        if (score < 0) {
        score = 0;
        }

        let maturityTier = "Tier 1: Partial";
        const recommendations: string[] = [];

        if (score >= 85) {
        maturityTier = "Tier 4: Adaptive";
        } else if (score >= 65) {
        maturityTier = "Tier 3: Repeatable";
        } else if (score >= 40) {
        maturityTier = "Tier 2: Risk Informed";
        }

        if (metrics.unpatchedFirewalls > 0) {
        recommendations.push("NIST CSF ID.AM-2: Deploy patch management sequence to secure perimeter firewalls.");
        }
        if (metrics.previousIncidents > 0) {
        recommendations.push("NIST CSF PR.RP-1: Establish a refined incident response playbook based on past vectors.");
        }
        if (metrics.intrusionAttempts > 20) {
        recommendations.push("NIST CSF DE.AE-2: Automate intrusion detection filters to throttle ongoing structural scans.");
        }

        return {
        score: Math.round(score),
        maturityTier,
        recommendations
        };
    }
    }
