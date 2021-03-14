#include <iostream>
#include <fstream>
#include <vector>
#include <stack>
#include <string>
#include <ctype.h>

using namespace std;

unsigned long long int test(string s, int stringLength, unsigned long long int testValue, int testValueOffset, int testValueIndex)
{
    // while it makes sense to keep on testing
    unsigned long long int result = 0;
    unsigned long long int nextValue = 0;
    int nextValueOffset = 0;
    int nextValueIndex = testValueIndex;
    // build and test next number
    while (nextValueIndex < stringLength)
    {
        //converts to integer
        nextValue = nextValue * 10 + (s[nextValueIndex] - '0'); 
        nextValueOffset++;
        if ( nextValue == 0 && nextValueOffset == 1)
        {
            // found zero as first digit
            result = 0;
            break;
        }
        if (nextValue == testValue + 1)
        {
            // if found, try again with the next test number.
            // if it works, return the smallest number in the sequence;
            if (result == 0)
            {
                result = testValue;
            }
            testValue = nextValue;
            testValueOffset = nextValueOffset;
            nextValue = 0;
            nextValueOffset = 0;
        }
        // if the numbers have the same digits and the nextValue is not 9, 99, 999, etc. then the sequence is broken
        else if ( (nextValue > testValue + 1) || (testValueOffset == nextValueOffset && nextValue * 10 != testValue + 1) )
        {
            result = 0;
            break;
        }
        nextValueIndex++; //only increase after there was no failure or break;
    }
    if (nextValueIndex == stringLength && (nextValue == 0)) 
    //nextValue is zero when the last part of the string was successfully processed into the next number in the seq
    {
        return result;
    }    
    else
    {
        return 0;
    }
}

void separateNumbers(string s) 
{
    if (s.length() <= 1)
    {
        cout << "NO\n";
        return;
    }
    if (s[0] == '0')
    {
        // must not start with zero
        cout << "NO\n";
        return ;
    }

    int stringLength = s.length();

    int testElementOffset = 0;
    int testElementIndex = 0;
    unsigned long long int testElementValue = 0;

    while ((stringLength - testElementOffset) > testElementOffset )
    {
        testElementValue = testElementValue * 10 + (s[testElementIndex++] - '0'); //converts to integer
        testElementOffset++;
        if (s[testElementIndex] == '0')
        {
            // needs to move on, can't split in zero;
            continue;
        }
        unsigned long long int testResult = test(s, stringLength, testElementValue, testElementOffset, testElementIndex);
        if (testResult > 0)
        {
            // must be at least 2 characters to be able to split in at least 2 numbers
            cout << "YES " + std::to_string(testElementValue) + "\n";
            return;
        }
    } 
    cout << "NO\n";
}

int main()
{
    //ofstream fout(getenv("OUTPUT_PATH"));
    
    ifstream idatafile("input.txt");
    if (idatafile.is_open())
    {
        string line;
        int q;
        getline(idatafile, line);
        q = stoi(line);

        //cin.ignore(numeric_limits<streamsize>::max(), '\n');

        for (int q_itr = 0; q_itr < q; q_itr++) 
        {
            getline(idatafile, line);

            separateNumbers(line);

            //std::cout << result << "\n";
        }
        idatafile.close();
    }

    //fout.close();

    return 0;
}
