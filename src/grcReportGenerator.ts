    import { AuditResult } from "./privacyAuditor";
    import { NistAssessment } from "./nistEngine";

    export interface GrcExecutiveReport {
    generatedAt: string;
    securityPostureSummary: string;
    complianceStatus: {
        gdprCompliant: boolean;
        nistMaturity: string;
    };
    remediationPlan: string[];
    }

    export class GrcReportGeneratorEngine {
    public static compileReport(
        payloadAudit: AuditResult,
        schemaViolations: string[],
        nistAssessment: NistAssessment
    ): GrcExecutiveReport {
        const isGdprCompliant = payloadAudit.isCompliant && schemaViolations.length === 0;
        
        let securityPostureSummary = "The infrastructure reflects an optimal structural posture with standardized baseline governance metrics.";
        if (nistAssessment.score < 70 || !isGdprCompliant) {
        securityPostureSummary = "CRITICAL ACTION REQUIRED: Multiple governance thresholds (GDPR/ISO27001/NIST) have failed validation parameters.";
        }

        const remediationPlan: string[] = [];
        
        if (payloadAudit.violations.length > 0) {
        payloadAudit.violations.forEach(v => remediationPlan.push(`[REMEDIATION] ${v}`));
        }
        
        if (schemaViolations.length > 0) {
        schemaViolations.forEach(v => remediationPlan.push(`[REMEDIATION] ${v}`));
        }

        if (nistAssessment.recommendations.length > 0) {
        nistAssessment.recommendations.forEach(r => remediationPlan.push(`[REMEDIATION] ${r}`));
        }

        if (remediationPlan.length === 0) {
        remediationPlan.push("No explicit structural vulnerabilities detected. Maintain current operational posture monitoring.");
        }

        return {
        generatedAt: new Date().toISOString(),
        securityPostureSummary,
        complianceStatus: {
            gdprCompliant: isGdprCompliant,
            nistMaturity: nistAssessment.maturityTier
        },
        remediationPlan
        };
    }
    }
