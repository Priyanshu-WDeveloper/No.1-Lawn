import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import type { FormFieldConfig } from '@/types/forms';
import { FormField } from './form-field';

interface DynamicFormProps {
  fields: FormFieldConfig[];
  onSubmit: (data: Record<string, unknown>) => void;
  defaultValues?: Record<string, unknown>;
}

function buildZodSchema(fields: FormFieldConfig[]) {
  const shape: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    let fieldSchema: z.ZodTypeAny;

    switch (field.type) {
      case 'email':
        // Email validation with required check
        if (field.required) {
          fieldSchema = z
            .string()
            .min(1, `${field.label} is required`)
            .email('Please enter a valid email address');
        } else {
          fieldSchema = z
            .string()
            .email('Please enter a valid email address')
            .or(z.literal(''));
        }
        break;
      case 'number':
        if (field.required) {
          fieldSchema = z.coerce
            .number()
            .min(0, 'Value must be positive');
        } else {
          fieldSchema = z.coerce.number().optional();
        }
        break;
      case 'location':
        if (field.required) {
          fieldSchema = z.object({
            latitude: z.string().min(1, 'Latitude is required'),
            longitude: z.string().min(1, 'Longitude is required'),
          });
        } else {
          fieldSchema = z
            .object({
              latitude: z.string().optional(),
              longitude: z.string().optional(),
            })
            .optional();
        }
        break;
      case 'address':
        if (field.required) {
          fieldSchema = z
            .string()
            .min(1, `${field.label} is required`);
        } else {
          fieldSchema = z.string().optional();
        }
        break;
      case 'file':
        if (field.required) {
          fieldSchema = z.instanceof(File);
        } else {
          fieldSchema = z.instanceof(File).nullable().optional();
        }
        break;
      case 'select':
        if (field.required) {
          fieldSchema = z
            .string()
            .min(1, `Please select a ${field.label.toLowerCase()}`);
        } else {
          fieldSchema = z.string().optional();
        }
        break;
      case 'date':
        if (field.required) {
          fieldSchema = z
            .string()
            .min(1, `${field.label} is required`);
        } else {
          fieldSchema = z.string().optional();
        }
        break;
      default:
        if (field.required) {
          fieldSchema = z
            .string()
            .min(1, `${field.label} is required`);
        } else {
          fieldSchema = z.string().optional();
        }
    }

    shape[field.name] = fieldSchema;
  });

  return z.object(shape);
}

export function DynamicForm({
  fields,
  onSubmit,
  defaultValues = {},
}: DynamicFormProps) {
  const schema = buildZodSchema(fields);

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const watchedValues = watch();

  const isFieldVisible = (field: FormFieldConfig): boolean => {
    if (!field.conditional) return true;

    const dependentValue = watchedValues[field.conditional.field];
    return dependentValue === field.conditional.value;
  };

  const onFormSubmit = (data: Record<string, unknown>) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
      {fields.map((field) => {
        if (!isFieldVisible(field)) return null;

        return (
          <Controller
            key={field.name}
            name={field.name}
            control={control}
            render={({ field: controllerField }) => (
              <FormField
                field={field}
                value={controllerField.value}
                onChange={controllerField.onChange}
                error={
                  errors[field.name]?.message as string | undefined
                }
              />
            )}
          />
        );
      })}
      <div className="flex justify-end gap-3 pt-6 border-t border-border">
        <Button
          type="button"
          variant="outline"
          className="h-12 px-6 rounded-xl border-border text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/10 transition-all"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="h-12 px-8 rounded-xl bg-[var(--sidebar-bg-from)] hover:bg-[var(--sidebar-bg-to)] text-white font-medium shadow-md hover:shadow-lg transition-all"
        >
          Save Details
        </Button>
      </div>
    </form>
  );
}
