import { Component, input, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseFieldComponent } from '../../base/base-field.component';

@Component({
  selector: 'app-input-field',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './input-field.html'
})
export class InputFieldComponent extends BaseFieldComponent {

  readonly type = input('text');
  readonly mask = input<string>('');
  readonly placeholder = input<string>('');

  readonly blur = output<void>();

    onBlur(): void {
        this.blur.emit();
    }

  onInput(event: Event): void {

    const input = event.target as HTMLInputElement;

    let value = input.value;

    switch (this.mask()) {

        case 'cpf':
            value = this.formatCpf(value);
            break;

        case 'rg':
            value = this.formatRg(value);
            break;

        case 'telefone':
            value = this.formatTelefone(value);
            break;

        case 'cep':
            value = this.formatCep(value);
            break;
    }

    input.value = value;

    this.control().setValue(value);
}

private formatCpf(value: string): string {

  const numbers = value
      .replace(/\D/g, '')
      .slice(0, 11);

  return numbers
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1-$2');
}

private formatRg(value: string): string {

  const numbers = value
      .replace(/\D/g, '')
      .slice(0, 10);

  return numbers
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1-$2');
}

private formatTelefone(value: string): string {

  const numbers = value
      .replace(/\D/g, '')
      .slice(0, 11);

  if (numbers.length <= 10) {

      return numbers
          .replace(/^(\d{2})(\d)/, '($1) $2')
          .replace(/(\d{4})(\d)/, '$1-$2');

  }

  return numbers
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2');
}

private formatCep(value: string): string {

  const numbers = value
      .replace(/\D/g, '')
      .slice(0, 8);

  return numbers
      .replace(/^(\d{5})(\d)/, '$1-$2');
}

}