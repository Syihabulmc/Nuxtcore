export interface SchemaIssue {
  path: string
  message: string
}

export interface SchemaResult<T> {
  success: boolean
  data?: T
  issues?: SchemaIssue[]
}

export interface EnterpriseSchema<T> {
  name: string
  validate(input: unknown): SchemaResult<T>
}

export function createSchemaStub<T>(name: string): EnterpriseSchema<T> {
  return {
    name,
    validate(): SchemaResult<T> {
      return {
        success: false,
        issues: [{ path: '', message: `${name} validation is not implemented yet` }]
      }
    }
  }
}
