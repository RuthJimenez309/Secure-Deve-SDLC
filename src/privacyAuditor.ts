export interface AuditResult {
  isCompliant: boolean;
  detectedPII: string[];
  violations: string[];
  timestamp: string;
}

export interface SecuritySchema {
  tableName: string;
  hasAccessControl: boolean;
  dataRetentionDays: number;
}

export class PrivacyAuditorEngine {
  private static readonly PII_PATTERNS: Record<string, RegExp> = {
    email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    creditCard: /\b(?:\d[ -]*?){13,16}\b/g,
    nationalId: /\b\d{4}-\d{4}-\d{5}\b/g,
  };

  public static auditPayload(payload: Record<string, any>): AuditResult {
    const detectedPII: string[] = [];
    const violations: string[] = [];
    const serialized = JSON.stringify(payload);

    for (const [key, pattern] of Object.entries(this.PII_PATTERNS)) {
      if (pattern.test(serialized)) {
        detectedPII.push(key);
        violations.push(
          `GDPR Violation: Unencrypted PII data type [${key}] exposed in mobile payload.`,
        );
      }
    }

    return {
      isCompliant: violations.length === 0,
      detectedPII,
      violations,
      timestamp: new Date().toISOString(),
    };
  }

  public static validateDatabaseSchema(schema: SecuritySchema): string[] {
    const schemaViolations: string[] = [];

    if (!schema.hasAccessControl) {
      schemaViolations.push(
        `ISO 27001 A.9 (Access Control): Table [${schema.tableName}] lacks explicit authorization layer.`,
      );
    }

    if (schema.dataRetentionDays > 730) {
      schemaViolations.push(
        `GDPR Article 5(1)(e) (Storage Limitation): Retention policy for [${schema.tableName}] exceeds maximum logical threshold (730 days).`,
      );
    }

    return schemaViolations;
  }
}
