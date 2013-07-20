from django import forms
from polls.models import Poll
from django.forms.widgets import Textarea


class CreatePollForm(forms.ModelForm):
    text = forms.CharField(label="Choices", widget=Textarea,
                           help_text="Each choice on it's own line")

    class Meta:
        model = Poll
        fields = ('title',)
